<?php
// This file is generated. Do not modify it manually.
return array(
	'recent-posts-showcase' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/recent-posts-showcase',
		'version' => '0.1.0',
		'title' => 'Recent Post Showcase',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A block to showcase recent posts with various display options.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'textdomain' => 'recent-posts-showcase',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:../render.php',
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'terms' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 6
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'grid'
			),
			'displayImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'displayExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'displayAuthor' => array(
				'type' => 'boolean',
				'default' => true
			),
			'displayDate' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableLoadMore' => array(
				'type' => 'boolean',
				'default' => false
			)
		)
	)
);
