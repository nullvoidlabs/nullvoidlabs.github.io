# frozen_string_literal: true
#
# Generates /tags/<tag>/ and /categories/<category>/ pages.
# Replaces jekyll-archives (which Chirpy pulled in) and keeps the same URLs.

module NullVoidLabs
  class TermPage < Jekyll::Page
    def initialize(site, kind, name, posts)
      @site = site
      @base = site.source
      slug = Jekyll::Utils.slugify(name)
      @dir = (kind == "tag" ? "tags" : "categories") + "/#{slug}"
      @name = "index.html"
      process(@name)
      @content = ""
      @data = {
        "layout" => "term",
        "kind" => kind,
        "term" => name,
        "title" => name,
        "term_posts" => posts.sort_by(&:date).reverse,
        "description" => "#{kind == 'tag' ? 'Write-ups tagged' : 'Write-ups filed under'} #{name} on NullVoidLabs.",
      }
    end
  end

  class TermGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.tags.each { |name, posts| add(site, "tag", name, posts) }
      site.categories.each { |name, posts| add(site, "category", name, posts) }
    end

    private

    def add(site, kind, name, posts)
      return if name.to_s.strip.empty?

      site.pages << TermPage.new(site, kind, name, posts)
    end
  end
end
