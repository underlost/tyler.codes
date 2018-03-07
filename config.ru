require 'rack/contrib/try_static'
require 'rack/rewrite'
require 'dalli'
require 'rack-cache'
require 'memcachier'

use Rack::Cache,
  verbose: true,
  metastore:   Dalli::Client.new,
  entitystore: "file:tmp/cache/rack/body"

use Rack::TryStatic,
    :root => ".publish",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

run lambda { [404, {'Content-Type' => 'text/html'}, ['Not Found']]}

NewRelic::Agent.after_fork(:force_reconnect => true) if defined? Unicorn
