---
layout: portfolio_item
title: International Living Future Institute
slug: ilfi
description: A Drupal to WordPress migration & custom theme
color: EF4900
rgba: 239,73,0,.75
image: /assets/img/portfolio/ilfi.jpg
permalink: /portfolio/ilfi/
date: 2016-12-29
previous_page: gonetyourself
next_page: s2spr
---

The International Living Future Institute (ILFI) is a nonprofit that aims to build an ecologically-minded, restorative world for all people. Fighting for social and environmental justice, ILFI looks to battle climate change and rid urban environments of dependency of fossil fuels.

Partnering with a Seattle based design firm, we built a custom WordPress theme from the ground up that allowed for incredible customization and page building techniques to allow ILFI to create beautiful pages and show case various case studies.

<ul class="list-inline clearfix">
{% for image in site.data.screenshots.ilfi %}
<li class="col-xs-2">
<a href="{{image.url}}" class="thumbnail lightbox">
  <img class="img-rounded" src="{{image.thumb}}" alt="{{ image.caption }}">
</a>
</li>
{% endfor %}
</ul>

[Visit Living Future Institute &raquo;](https://living-future.org)
