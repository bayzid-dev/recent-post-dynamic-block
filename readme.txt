# Recent Posts Showcase

**Version:** 0.1.0  
**Author:** bayzid-dev
**Text Domain:** recent-posts-showcase  

A Gutenberg block to showcase recent posts with customizable layout, display options, and optional "Load More" functionality.

---

## Features

- Display recent posts in **Grid** or **Carousel** layout.  
- Optionally show **featured images**, **excerpts**, **author names**, and **publish dates**.  
- Filter posts by **taxonomy** (categories or custom taxonomies) and selected **terms**.  
- Load posts dynamically using **AJAX/REST API** with a **Load More** button.  
- Fully **responsive** and works with modern WordPress block editor.  
- Supports **color customization** for text and background.  

---

## Installation

1. Upload the plugin folder to `/wp-content/plugins/recent-posts-showcase/`.  
2. Activate the plugin through the **Plugins** menu in WordPress.  
3. Add the **Recent Posts Showcase** block to your post, page, or widget area.  

---

## Block Attributes

| Attribute         | Type      | Default      | Description                                                                 |
|------------------|-----------|-------------|-----------------------------------------------------------------------------|
| `postType`        | string    | `post`       | Post type to display (e.g., `post`, `page`, or custom post type).          |
| `taxonomy`        | string    | `category`   | Taxonomy to filter posts (category, tag, or custom taxonomy).              |
| `terms`           | array     | `[]`         | Specific term IDs for filtering posts.                                      |
| `postsToShow`     | number    | `6`          | Number of posts to show initially.                                         |
| `layout`          | string    | `grid`       | Layout style (`grid` or `carousel`).                                       |
| `displayImage`    | boolean   | `true`       | Whether to display featured images.                                        |
| `displayExcerpt`  | boolean   | `true`       | Whether to display post excerpts.                                          |
| `displayAuthor`   | boolean   | `true`       | Whether to display post author names.                                      |
| `displayDate`     | boolean   | `true`       | Whether to display post publish dates.                                     |
| `enableLoadMore`  | boolean   | `false`      | Enable the AJAX "Load More" button for additional posts.                   |

---

## Usage

1. Add the block to your content area.  
2. Configure the **layout** and **display options** in the block editor sidebar.  
3. If "Load More" is enabled, users can click the button to dynamically load more posts without reloading the page.  

---

## REST API Endpoint

The block uses a custom REST API endpoint for the "Load More" functionality:  

