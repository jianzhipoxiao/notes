<?php

class Elementor_FIFU_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'fifu-elementor';
    }

    public function get_title() {
        $strings = fifu_get_strings_elementor();
        return '(FIFU) ' . $strings['title']['image']();
    }

    public function get_icon() {
        return 'eicon-featured-image';
    }

    public function get_categories() {
        return ['basic'];
    }

    protected function _register_controls() {
        $strings = fifu_get_strings_elementor();

        $this->start_controls_section(
                'content_section_image',
                [
                    'label' => $strings['section']['image'](),
                    'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
        );
        $this->add_control(
                'fifu_input_url',
                [
                    'label' => $strings['control']['image'](),
                    'show_label' => true,
                    'label_block' => true,
                    'type' => \Elementor\Controls_Manager::TEXT,
                    'input_type' => 'url',
                    'placeholder' => 'https://example.com/image.jpg',
                ]
        );
        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $image_url = esc_url($settings['fifu_input_url']);
        if ($image_url) {
            $image_url = fifu_convert($image_url);
            echo '<div style="width:100%;text-align:center;"><img class="oembed-elementor-widget fifu-elementor-image" src="' . $image_url . '"/></div>';
        }
    }

}

function fifu_image_after_save_elementor_data($post_id, $editor_data) {
    foreach ($editor_data as $data) {
        if (isset($data['elements'][0]['widgetType'])) {
            $widgetType = $data['elements'][0]['widgetType'];
            if (strpos($widgetType, 'fifu') !== false) {
                $settings = $data['elements'][0]['settings'];

                if ($widgetType == 'fifu-elementor') {
                    if (isset($settings['fifu_input_url'])) {
                        $image_url = $settings['fifu_input_url'];
                        if (filter_var($image_url, FILTER_VALIDATE_URL) === false)
                            $image_url = '';
                        fifu_dev_set_image($post_id, $image_url);
                    }
                }
            }
        }
    }
}

add_action('elementor/editor/after_save', 'fifu_image_after_save_elementor_data', 10, 2);

