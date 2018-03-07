---
layout: portfolio_item
title: gMachina
slug: gmachina
description: A blockchain inspired, API based game.
color: 005e6a
rgba: 0,94,106,.5
image: /assets/img/portfolio/gmachina.jpg
permalink: /portfolio/gmachina/
date: 2018-01-01
previous_page: jadedgamer
next_page: vapor
---

gMachina is a small indie game I'm working on.

<ul class="list-inline clearfix">
{% for image in site.data.screenshots.gmachina %}
<li class="col-xs-2">
<a href="{{image.url}}" class="thumbnail lightbox">
  <img class="img-rounded" src="{{image.thumb}}" alt="{{ image.caption }}">
</a>
</li>
{% endfor %}
</ul>

[Visit gMachina.net &raquo;](https://gmachina.net/)
