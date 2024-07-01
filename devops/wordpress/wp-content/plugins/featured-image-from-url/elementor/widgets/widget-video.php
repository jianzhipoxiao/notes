<?php

class Elementor_FIFU_Video_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'fifu-video-elementor';
    }

    public function get_title() {
        $strings = fifu_get_strings_elementor();
        return '(FIFU) ' . $strings['title']['video']();
    }

    public function get_icon() {
        return 'eicon-youtube';
    }

    public function get_categories() {
        return ['basic'];
    }

    protected function _register_controls() {
        $strings = fifu_get_strings_elementor();

        $this->start_controls_section(
                'content_section_video',
                [
                    'label' => $strings['section']['video'](),
                    'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
        );
        $this->add_control(
                'fifu_video_input_url',
                [
                    'label' => $strings['control']['video'](),
                    'show_label' => true,
                    'label_block' => true,
                    'type' => \Elementor\Controls_Manager::TEXT,
                    'input_type' => 'url',
                    'placeholder' => 'https://youtube.com/watch?v=ID',
                    'description' => $strings['control']['pro'](),
                ]
        );
        $this->end_controls_section();
    }

    protected function render() {
        
    }

}

