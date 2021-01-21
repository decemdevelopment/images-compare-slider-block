<?php
/*
Plugin Name: Image Comparison Slider Block
*/

function image_comparison_slider_block_register_block()
{

	// Register JavasScript File build/index.js
	wp_register_script(
		'image-comparison-slider-block',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
	);

	// Register editor style build/index.css
	wp_register_style(
		'image-comparison-slider-block-editor-style',
		plugins_url('build/index.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
	);

	// Register front end block style build/style-index.css
	wp_register_style(
		'image-comparison-slider-block-frontend-style',
		plugins_url('build/style-index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
	);

	// Register your block
	register_block_type('image-comparison-slider-block/example', array(
		'editor_script' => 'image-comparison-slider-block',
		'editor_style' => 'image-comparison-slider-block-editor-style',
		'style' => 'image-comparison-slider-block-frontend-style',
	));
}

add_action('init', 'image_comparison_slider_block_register_block');

function image_comparison_frontend_scripts()
{
	wp_enqueue_script(
		'image-comparison-slider',
		plugins_url('src/plugins/img-comparison.js', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'src/plugins/img-comparison.js'),
		true
	);
}

add_action('wp_enqueue_scripts', 'image_comparison_frontend_scripts');
