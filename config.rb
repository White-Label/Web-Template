###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

activate :directory_indexes

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'img'

# Use Sprockets
activate :sprockets

sprockets.append_path File.join root, "node_modules"

# Build-specific configuration
configure :build do

  ignore 'images/*.psd'
  ignore 'css/lib/*'
  ignore 'css/vendor/*'
  ignore 'js/app/*'
  ignore 'js/lib/*'
  ignore 'js/vendor/*'

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# Required to use html5mode locally
middleman_sitemap = sitemap
use Rack::Rewrite do
  rewrite %r{^[^.]*$}, -> (_, rack_env) do
    base_url = rack_env['PATH_INFO']
    middleman_sitemap.find_resource_by_path(base_url) ? base_url : '/'
  end
end
