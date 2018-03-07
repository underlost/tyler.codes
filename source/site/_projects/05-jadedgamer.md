---
layout: portfolio_item
title: Jaded Gamer
slug: jadedgamer
description: 'Video Game News Aggregator'
color: 57ad68
rgba: 87,173,104,.5
image: /assets/img/portfolio/jaded.jpg
permalink: /portfolio/jadedgamer/
date: 2014-05-01
previous_page: lifewellplayed
next_page: gmachina
---

Jaded Gamer was a video game news site aggregator, run and managed completely in the cloud, utilizing various SAAS applications. RSS updates were pushed to the site via the pubsubhubbub protocol. New stories were then indexed immediately, and could be searched through by the elastic-search based server. For additional details, you can learn more on [Medium](https://medium.com/@underlost/building-jaded-gamer-e08c6532b56d#.ew1sszjq9).


<ul class="list-inline clearfix">
{% for image in site.data.screenshots.jadedgamer %}
<li class="col-xs-2">
<a href="{{image.url}}" class="thumbnail lightbox">
  <img class="img-rounded" src="{{image.thumb}}" alt="{{ image.caption }}">
</a>
</li>
{% endfor %}
</ul>

#### Update
The Jaded Gamer service has since been retired as of September 1st, 2016. Jaded Gamer has since relaunched as a mobile development company. The original news site aggregator will live on in some form in 2017.
