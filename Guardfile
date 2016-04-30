# vim: set filetype=ruby:

guard 'sass', {
  :input    => 'src/assets/sass',
  :output   => 'assets/css/',
  :compass  => true,
  :compress => true,
  :style    => :compressed
}

guard 'sprockets', :destination => 'assets/js', :asset_paths => 'src/assets/js', :minify => true do
  watch %r(^src/assets/js/[^/]+\.js$)
end

guard 'livereload' do
  watch %r{.*}
end
