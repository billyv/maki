# use bundler
require 'rubygems'
require 'bundler/setup'
# load all of the gems in the gemfile
Bundler.require

# landing page
get '/' do
  #load some images. click thru to home
  erb :landing
end

# home page
get '/top' do
  erb :top
end

# home page (en)
get '/top/en' do
  erb :top_en
end

# works page
get '/works' do
  # load up some images and pass them in...
  erb :works
end

# contact
get '/contact' do
  erb :contact
end

# contact (en)
get '/contact/en' do
  erb :contact_en
end
