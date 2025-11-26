---
layout: base.njk
title: Posts
description: Blog posts and updates.
eleventyNavigation:
  key: Posts
  order: 1
---

# Posts

{% if collections.posts.length %}

<ul class="not-prose space-y-6 mt-8">
  {% for post in collections.posts %}
  <li class="border-l-2 border-primary-500 pl-4">
    <a href="{{ post.url }}" class="text-lg font-semibold text-primary-300 hover:text-primary-400 transition-colors">
      {{ post.title }}
    </a>
    <p class="text-sm text-neutral-400 mt-1">
      <time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
    </p>
    {% if post.data.description %}
    <p class="text-neutral-300 mt-2">{{ post.data.description }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet. Add markdown files to <code>src/posts/</code> to get started.</p>
{% endif %}
