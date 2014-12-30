# {%= name %} {%= badge("fury") %}

> {%= description %}

- In addition to verb's unique features, verb can also run any [gulp](https://github.com/gulpjs/gulp) plugin
- All methods from [Template](https://github.com/jonschlinkert/template) can be used in Verb

{%= include("install-global") %}

## Usage

Run `verb` to build your project's readme from a `.verb.md` file using metadata from package.json, or add a `verbfile.js` to the project if you need more.

**Example .verb.md**

Basic template for generating a readme from metadata in `package.json`:

```markdown
# {%%= name %} {%%= badge("fury") %}

> {%%= description %}

## Install
{%%= include("install-global") %}

## API
{%%= apidocs("index.js") %}

## Author
{%%= include("author") %}

## License
{%%= copyright() %}
{%%= license() %}

***

{%%= include("footer") %}
```

{%= include("install-npm") %}

**Example verbfile.js**

Basic verbfile for projects that need more than a readme for documentation:

```js
var verb = require('verb');

// load data to pass to templates.
verb.data('docs/*.json');
verb.data({author: 'Jon Schlinkert'});

verb.task('default', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

# Template API

> See [Template](https://github.com/jonschlinkert/template) for all available methods.

### .data

> Load data to pass to templates.

Any of these work:

```js
verb.data({foo: 'bar'});
verb.data('package.json');
verb.data(['foo/*.{json,yml}']);
```

### .helper

> Add helpers to be used in templates.

```js
verb.helper('read', function(filepath) {
  return fs.readFileSync(filepath, 'utf8');
});

//=> {%%= read("foo.txt") %}
```

### .partial

> Add partials to be used in other templates.

```js
verb.partial('notice', { content: '<strong>...</strong>' });
verb.partial('banner', { content: '/*! Copyright (c) 2014 Jon Schlinkert, Brian Woodward... */' });
// or load a glob of partials
verb.partials('partials/*.md');

// optionally pass locals, all template types support this
verb.partials('partials/*.md', {site: {title: 'Code Project'}});
```

**Usage**

Use the `partial` helper to inject into other templates:

```js
{%%= partial("banner") %}
```

Get a cached partial:

```js
var banner = verb.cache.partials['banner'];
```

### .page

> Add pages that might be rendered (really, any template is renderable, pages fit the part though)

```js
verb.page('toc.md', { content: 'Table of Contents...'});
// or load a glob of pages
verb.pages('pages/*.md', {site: {title: 'Code Project'}});
```

Use the `page` helper to inject pages into other templates:

```js
{%%= page("toc") %}
```

Get a cached page:

```js
var toc = verb.cache.pages['toc'];
```

Pages are `renderable` templates, so they also have a `.render()` method:

```js
var toc = verb.cache.pages['toc'];
// async
toc.render({}, function(err, content) {
  console.log(content);
});

// or sync
var res = toc.render();
```

**Params**

 - `locals` **{Object}**: Optionally pass locals as the first arg
 - `callback` **{Function}**: If a callback is passed, the template will be rendered async, otherwise sync.


### .layout

> Add layouts, which are used to "wrap" other templates:

```js
verb.layout('default', {content: [
  '<!DOCTYPE html>',
  '  <html lang="en">',
  '  <head>',
  '    <meta charset="UTF-8">',
  '    <title>{%%= title %}</title>',
  '  </head>',
  '  <body>',
  '    <<% body %>>', // `body` is the insertion point for another template
  '  </body>',
  '</html>'
].join('\n')});

// or load a glob of layouts
verb.layouts('layouts/*.md', {site: {title: 'Code Project'}});
```

Layouts may be use with any other template, including other layouts. Any level of nesting is also possible.

**Body tags**

Layouts use a `body` as the insertion point for other templates. The syntax verb uses for the `body` tag is:

```js
<<% body %>>
```

Admittedly, it's a strange syntax, but that's why we're using it. Verb shouldn't collide with templates that you might be using in your documentation.


**Usage**

Layouts can be defined in template locals:

```js
// either of these work (one object or two)
verb.page('toc.md', { content: 'Table of Contents...'}, { layout: 'default' });
verb.partial('foo.md', { content: 'partial stuff', layout: 'block' });
```

Or in the front matter of a template. For example, here is how another layout would use our layout example from earlier:

```js
// using this 'inline' template format to make it easy to see what's happening
// this could be loaded from a file too
verb.layout('sidebar', {content: [
  '---',
  'layout: default',
  '---',
  '<div>',
  ' <<% body %>>',
  '</div>'
].join('\n')});
```

# Task API

{%= apidocs("index.js") %}

## Run tests

```bash
npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue]({%= bugs.url %})

## Author
{%= include("authors", {
  authors: [
    {name: 'Jon Schlinkert', username: 'jonschlinkert'},
    {name: 'Brian Woodward', username: 'doowb'}
  ]
}) %}

## License
{%= copyright() %}
Copyright (c) 2014 Fractal <contact@wearefractal.com>
{%= license() %}

***

{%= include("footer") %}
