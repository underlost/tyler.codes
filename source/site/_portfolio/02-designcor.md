---
layout: portfolio_item
title: Designcor
slug: designcor
description: 'Design and code for graphic and print company.'
color: 7cad00
rgba: 124,173,0,.5
image: /assets/img/portfolio/designcor.jpg
permalink: /portfolio/designcor/
date: 2014-02-01
next_page: gonetyourself
previous_page: mbarrington
---

The original Designcor website had been using the same design and code for nearly a decade. Together we came up with a new vision for the website, where I wrote a custom WordPress theme using Twitter Bootstrap and JQuery. Designcor has since became part of another agency, however the WordPress theme is now available on [Github](https://github.com/underlost/designcor).

<ul class="list-unstyled row clearfix">
{% for image in site.data.screenshots.designcor %}
<li class="col-6 mb-3">
<a href="{{image.url}}" class="thumbnail lightbox">
  <img class="img-rounded" src="{{image.thumb}}" alt="{{ image.caption }}">
</a>
</li>
{% endfor %}
</ul>

[Github Project &raquo;](https://github.com/underlost/designcor)
