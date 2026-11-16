# frozen_string_literal: true
#
# NullVoidLabs site helpers. Replaces the Chirpy features the posts rely on,
# so posts render the same without the theme.
#
#   * media_subpath   - relative image paths in a post resolve against it
#   * log numbers     - every post gets a sequential log number + category code
#                       (used for the instrument-tag badges)
#   * summaries       - _data/summaries.yml supplies an index/SEO summary per
#                       post without editing the post; falls back to the first
#                       real paragraph of the post
#   * lazy images     - post images get loading="lazy" and decoding="async"

module NullVoidLabs
  ABSOLUTE = %r{\A(?:[a-z][a-z0-9+.-]*:|/|#)}i.freeze

  def self.join_subpath(subpath, path)
    return path if path.nil? || path.empty? || path =~ ABSOLUTE || subpath.nil?

    "#{subpath.to_s.chomp('/')}/#{path}"
  end

  class PostPrep < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      codes = site.data.fetch("categories", {})
      summaries = site.data.fetch("summaries", {}) || {}
      posts = site.posts.docs.sort_by(&:date)

      posts.each_with_index do |post, i|
        data = post.data
        category = Array(data["categories"]).first.to_s
        # a trailing comma in a tag list leaves a nil tag behind
        data["tags"] = Array(data["tags"]).compact.map(&:to_s).map(&:strip).reject(&:empty?)

        data["log_no"] = format("%03d", i + 1)
        data["tag_code"] = codes.dig(category, "code") ||
                           category.gsub(/[^A-Za-z]/, "")[0, 3].upcase

        if (summary = summaries[data["slug"]])
          data["summary"] = summary.strip
          data["description"] ||= data["summary"]
        end

        image = data["image"]
        if image.is_a?(Hash) && image["path"]
          image["path"] = NullVoidLabs.join_subpath(data["media_subpath"], image["path"])
        elsif image.is_a?(String)
          data["image"] = NullVoidLabs.join_subpath(data["media_subpath"], image)
        end
      end
    end
  end

  module Filters
    # First paragraph that reads like prose: skips blockquotes, label lines
    # ("**Target:** ..."), italic disclaimers and short timestamp notes.
    def nvl_summary(html, max = 220)
      text = html.to_s.gsub(%r{<blockquote.*?</blockquote>}m, "")
      text.scan(%r{<p>(.*?)</p>}m).each do |(inner)|
        next if inner =~ /\A\s*<(strong|em|img|a )/
        next if inner.include?("<br")

        plain = inner.gsub(/<[^>]+>/, "").gsub(/\s+/, " ").strip
        next if plain.length < 120

        return plain.length > max ? "#{plain[0, max].sub(/\s+\S*\z/, '')}…" : plain
      end
      ""
    end

    def nvl_reading_minutes(html)
      words = html.to_s.gsub(%r{<pre.*?</pre>}m, " ").gsub(/<[^>]+>/, " ").split.size
      [(words / 220.0).ceil, 1].max
    end
  end
end

Liquid::Template.register_filter(NullVoidLabs::Filters)

Jekyll::Hooks.register :posts, :post_render do |post|
  subpath = post.data["media_subpath"]
  post.output = post.output.gsub(/<img\b([^>]*)>/) do
    attrs = Regexp.last_match(1).sub(%r{\s*/\s*\z}, "")
    attrs = attrs.sub(/\ssrc="([^"]+)"/) { %( src="#{NullVoidLabs.join_subpath(subpath, Regexp.last_match(1))}") }
    attrs += ' loading="lazy"' unless attrs.include?("loading=")
    attrs += ' decoding="async"' unless attrs.include?("decoding=")
    "<img#{attrs}>"
  end
end
