[![Build Status](https://travis-ci.org/underlost/tyler.codes.svg?branch=master)](https://travis-ci.org/underlost/tyler.codes)
[![Dependencies](https://david-dm.org/underlost/tyler.codes.svg)](https://david-dm.org/underlost/tyler.codes)

# Tyler.codes
Tyler.codes is the personal site/portfolio of Tyler Rilling (that's me). It's a tiny Jekyll-based static site designed to work on Heroku, Github, and Amazon S3/CloudFront, but should work on any host you can upload a static website to.

## Usage
The site can be deployed multiple ways, and on multiple services. Since the site is Jekyll based, a simple `bundle exec jekyll serve --w` (assuming you use bundler) is only needed for local development, living at `http://localhost:4002/`.

### Github
Deploying to Github pages is done incredibly simply with the `gulp github` command. Gulp is configured with the necessary branch and git repo to push to. It does all the heavy lifting as well; compiling all assets, minifying files, running jekyll, and finally pushing to the designated git repo.

### Heroku
[Tyler.codes](https://tyler.codes) can also be deployed to a Heroku instance `(git push heroku master)`, and was originally how the intended host. It uses a custom buildpack which offloads everything, relying on Heroku to run the needed Jekyll commands, then serving the site with the Unicorn web server. Additionally Heroku can be used as a staging ground, storing the site's S3 environmental variables there, allowing the site to then be pushed to an S3 bucket via: `heroku run s3_website push`

### S3/CloudFront
Alternatively, Heroku can be bypassed completely by editing the s3_website.yml and adding the variables directly (or adding them to your `~/.bashrc` or a .env file), then pushed to S3/CloudFront with: `bundle exec s3_website push`

### Final thoughts
And there you have it. Is this a little overkill? Probably. But I like having multiple deployment methods, and it's easy to change the DNS between Heroku, Github, and Amazon S3 if/when needed.
