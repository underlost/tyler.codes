---
layout: portfolio_item
title: M | Barrington
slug: mbarrington
description: 'Concept, design, and code for local insurance company'
color: f9a61a
rgba: 249,166,26,.5
image: /assets/img/portfolio/mbarr.jpg
permalink: /portfolio/mbarrington/
date: 2014-01-01
previous_page: designcor
next_page: equire
show_gallery: False
---

M Barrington was a collaboration with local design agency, Designcor. I consulted on design ideas, as well as built a custom Wordpress theme and several plugins to allow agents to share important documents and publications with their clients on the website.

<ul class="list-unstyled row clearfix">
{% for image in site.data.screenshots.mbarrington %}
<li class="col-6 mb-3">
<a href="{{image.url}}" class="thumbnail lightbox">
  <img class="img-rounded" src="{{image.thumb}}" alt="{{ image.caption }}">
</a>
</li>
{% endfor %}
</ul>

[Visit M Barrington &raquo;](http://mbarrington.com)
