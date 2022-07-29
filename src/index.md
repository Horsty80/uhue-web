---
title: My First Eleventy Site
layout: base.njk
---

## My firsts article

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque iure explicabo debitis nesciunt
accusamus, deleniti quos voluptatum adipisci in similique quae voluptates maiores consequuntur
omnis. Harum doloribus nemo inventore amet? Porro iure culpa, consequuntur pariatur ex esse vero

{% for service in services %}

- [{{ service.attributes.title }}](services/{{ service.attributes.slug }}.html)

{%- endfor %}
