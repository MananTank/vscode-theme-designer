const ps = 'punctuation.separator.key-value.html';
const dq = 'string.quoted.double.html';
const sq = 'string.quoted.single.html';
const tag = 'entity.name.tag.html';
const pBegin = 'punctuation.definition.tag.begin.html';
const pEnd = 'punctuation.definition.tag.end.html';
const colorDull = '#ffffff33';
// --- others
const stringBegin = 'punctuation.definition.string.begin.html';
const stringEnd = 'punctuation.definition.string.end.html';

function tagify(name, color, s = 'structure', target = name) {
	const sStart = `meta.tag.${s}.${target}.start.html`;
	const sEnd = `meta.tag.${s}.${target}.end.html`;
	const colorTransparent = `${color}50`;

	const atrValue = atrName => `
    {
      "name": "[HTML] - <${name} ${atrName}='string' >",
      "scope": "${sStart} meta.attribute.${atrName}.html ${dq}, ${sStart} meta.attribute.${atrName}.html ${sq}",
      "settings": {
        "foreground": "${color}66"
      }
    }
  `;

	return `
  {
    "name": "[HTML] - <${name}> start ",
    "scope": "${sStart} ${tag}",
    "settings": {
      "foreground": "${color}"
    }
  },
  {
    "name": "[HTML] - </${name}> end ",
    "scope": "${sEnd} ${tag}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - punctuations <> for tag ${name} start",
    "scope": "${sStart} ${pBegin}, ${sStart} ${pEnd}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - punctuations <> for tag ${name} end  ",
    "scope": "${sEnd} ${pBegin}, ${sEnd} ${pEnd}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - <${name} string >",
    "scope": "${sStart} ${dq}, ${sStart} ${sq}",
    "settings": {
      "foreground": "${color}"
    }
  },

  {
    "name": "[HTML] - <${name} quotes  >",
    "scope": "${sStart} ${stringBegin}, ${sStart} ${stringEnd}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - <${name} atribute name",
    "scope": "${sStart} entity.other.attribute-name.html",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - <${name} = >",
    "scope": "${sStart} ${ps}, ${sEnd} ${ps}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  ${atrValue('for')},
  ${atrValue('href')}

  `;
}

function tagifySelfClosing(name, color, st = 'object') {
	const s = `meta.tag.${st}.${name}.void.html`;
	const colorTransparent = `${color}50`;

	const atrValue = atrName => `
    {
      "name": "[HTML] - <${name} ${atrName}='string' />",
      "scope": "${s} meta.attribute.${atrName}.html ${dq}, ${s} meta.attribute.${atrName}.html ${sq}",
      "settings": {
        "foreground": "${colorTransparent}"
      }
    }
  `;

	return `
  {
    "name": "[HTML] - <${name}> ",
    "scope": "${s} ${tag}",
    "settings": {
      "foreground": "${color}"
    }
  },

  {
    "name": "[HTML] - </${name}> ",
    "scope": "${s} ${pBegin}, ${s} ${pEnd}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  {
    "name": "[HTML] - <${name} string />",
    "scope": "${s} ${dq}, ${s} ${sq}",
    "settings": {
      "foreground": "${color}"
    }
  },

  {
    "name": "[HTML] - <${name} quotes  >",
    "scope": "${s} ${stringBegin}, ${s} ${stringEnd}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },
  {
    "name": "[HTML] - <${name} quotes in string  >",
    "scope": "${s} entity.other.attribute-name.html",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },
  {
    "name": "[HTML] - <${name} = >",
    "scope": "${s} ${ps}",
    "settings": {
      "foreground": "${colorTransparent}"
    }
  },

  ${atrValue('src')}

  `;
}

const tagEnd = x => `meta.tag.${x}.end.html ${tag}`;

const layout = {
	c9: {
		hex: '#193549',
		info: [
			{ name: 'editor', id: 'editor', forBefore: true, forBg: true },
			{ name: 'groups', id: 'side-bar-group', forBg: true },
		],
	},

	c26: {
		hex: '#193549',
		info: [{ name: 'inactive tabs', id: 'inactive-tabs', forBg: true }],
	},

	c10: {
		hex: '#15232d',
		info: [
			{ name: 'title bar', id: 'title-bar', forBg: true },
			{ name: 'side bar', id: 'side-bar', forBg: true },
			{ name: 'tab border', id: 'tab-border', forBorder: true },
		],
	},

	c27: {
		hex: '#15232d',
		info: [{ name: 'status bar', id: 'status-bar', forBg: true }],
	},
	c1: {
		hex: '#122738',
		info: [
			{ name: 'activity bar', id: 'activity-bar', forBg: true },
			{ name: 'gutter', id: 'line-gutter', forBg: true },
			{ name: 'panel', id: 'terminal', forBg: true },
			{ name: 'active tab', id: 'active-tab', forBg: true },
		],
	},

	c2: {
		hex: '#0d3a58',
		info: [{ name: 'active file', id: 'active-file', forBg: true }],
	},
	c8: {
		hex: '#aaaaaa',
		info: [{ name: 'secondary font color', id: 'secondary-font', forBg: true }],
	},
	c3: {
		hex: '#ffffff',
		info: [
			{ name: 'primary font color', id: 'primary-font', forBg: true },
			{ name: 'activity bar icons', id: 'activity-bar-icon', forBg: true },
		],
	},
};

const scopes = {
	c7: {
		hex: '#ff9d00',
		info: [
			{ name: 'conditions', id: 'if', forColor: true, pages: ['.js'] },
			{ name: 'operators', id: 'operators', forColor: true, pages: ['.js'] },
			{
				name: 'import export',
				id: 'import',
				forColor: true,
				pages: ['.react'],
			},
			{ name: 'css units', id: 'css-units', forColor: true, pages: ['.css'] },
			{
				name: '!important',
				id: 'important',
				forColor: true,
				pages: ['.css', '.stylus'],
			},
			{
				name: 'media',
				id: 'media',
				forColor: true,
				pages: ['.css', '.stylus'],
			},
			{
				name: 'html attribute',
				id: 'html-atr',
				forColor: true,
				pages: ['.html'],
			},
		],
	},

	c4: {
		hex: '#ffc600',
		info: [
			{ name: '=>', id: 'arrow', forColor: true, pages: ['.js'] },
			{
				name: 'function name',
				id: 'function-name',
				forColor: true,
				pages: ['.js'],
			},
			{ name: 'badges', id: 'badges' },
			{ name: 'cursor', id: 'cursor', forColor: true, pages: ['.js'] },
			{ name: 'const', id: 'const', forColor: true, pages: ['.js'] },
			{ name: 'let', id: 'let', forColor: true, pages: ['.js'] },
			{ name: 'mixins', id: 'mixins', forColor: true, pages: ['.stylus'] },
			{
				name: 'variable properties',
				id: 'var-props',
				forColor: true,
				pages: ['.js'],
			},
		],
	},

	c20: {
		hex: '#ffee80',
		info: [
			{ name: 'CSS values', id: 'css-values', forColor: true, pages: ['.css'] },
			{
				name: 'breakpoint width',
				id: 'css-brw',
				forColor: true,
				pages: ['.css'],
			},
			{ name: '()', id: 'parentheses', forColor: true, pages: ['.js'] },
		],
	},

	c21: {
		hex: '#a5ff90',
		info: [
			{ name: 'strings', id: 'strings', forColor: true, pages: ['.js'] },
			{
				name: 'css properties',
				id: 'css-props',
				forColor: true,
				pages: ['.css'],
			},
			{
				name: 'html attr values',
				id: 'html-atr-value',
				forColor: true,
				pages: ['.css'],
			},
		],
	},

	c15: {
		hex: '#3ad900',
		info: [
			{
				name: 'template strings',
				id: 'template-strings',
				forColor: true,
				pages: ['.js'],
			},
			{
				name: 'class names',
				id: 'css-class',
				forColor: true,
				pages: ['.css', '.stylus'],
			},
			{ name: 'var( )', id: 'css-var', forColor: true, pages: ['.css'] },
		],
	},

	c19: {
		hex: '#e1efff',
		info: [
			{ name: '{ }', id: 'curly', forColor: true, pages: ['.js', '.react'] },
			{
				name: ': . , ;',
				id: 'dots',
				forColor: true,
				pages: ['.js', '.css', '.stylus', '.react'],
			},
			{
				name: 'pseudo',
				id: 'css-ps',
				forColor: true,
				pages: ['.css', '.stylus'],
			},
			{ name: 'html-text', id: 'html-text', forColor: true, pages: ['.html'] },
		],
	},

	c25: {
		hex: '#e1efff',
		info: [{ name: 'object', id: 'object', forColor: true, pages: ['.js'] }],
	},

	c24: {
		hex: '#e1efff',
		info: [
			{
				name: 'variable names',
				id: 'var-names',
				forColor: true,
				pages: ['.js'],
			},
		],
	},

	c14: {
		hex: '#ff628c',
		info: [
			{ name: 'constants', id: 'constants', forColor: true, pages: ['.js'] },
		],
	},

	c16: {
		hex: '#fb94ff',
		info: [
			{
				name: 'function keyword',
				id: 'function-keyword',
				forColor: true,
				pages: ['.js'],
			},
		],
	},

	c18: {
		hex: '#9effff',
		info: [
			{ name: '& (parent)', id: 'css-and', forColor: true, pages: ['.stylus'] },
			{
				name: 'stylus variables',
				id: 'stylus-variables',
				forColor: true,
				pages: ['.stylus'],
			},
			{
				name: 'css variables',
				id: 'css-var-name',
				forColor: true,
				pages: ['.css', '.stylus'],
			},
		],
	},

	c28: {
		hex: '#4DFFE7',
		info: [
			{ name: '<div>', id: 'div', forColor: true, pages: ['.html'] },
			{ name: '<xxx>', id: 'other-tag', forColor: true, pages: ['.html'] },
		],
	},
	c29: {
		hex: '#4DFFB2',
		info: [
			{ name: '<h1> - <h6>', id: 'h1', forColor: true, pages: ['.html'] },
			{ name: '<p>', id: 'p', forColor: true, pages: ['.html'] },
		],
	},
	c30: {
		hex: '#FA70FF',
		info: [{ name: '<a>', id: 'a', forColor: true, pages: ['.html'] }],
	},
	c31: {
		hex: '#FF8B1F',
		info: [
			{ name: '<ul> <ol> <li>', id: 'ul', forColor: true, pages: ['.html'] },
		],
	},
	c32: {
		hex: '#BC8FFF',
		info: [{ name: '<svg>', id: 'svg', forColor: true, pages: ['.html'] }],
	},
	c33: {
		hex: '#8FD8FF',
		info: [
			{ name: '<input>', id: 'input', forColor: true, pages: ['.html'] },
			{ name: '<img>', id: 'img', forColor: true, pages: ['.html'] },
		],
	},

	c35: {
		hex: '#EFFF61',
		info: [{ name: 'text', id: 'html-text', forColor: true, pages: ['.html'] }],
	},
};

const others = {
	currentLine: {
		hex: '#1F4662',
		info: [{ name: 'current line', id: 'current-line' }],
	},
	selected: {
		hex: '#0050A4',
		info: [{ name: 'selected text', id: 'selected-text', forChildren: true }],
	},
	comment: {
		hex: '#0088ff',
		info: [
			{
				name: 'comment',
				id: 'comment',
				forColor: true,
				pages: ['.js', '.stylus'],
			},
		],
	},
};

const fixed = {
	// used as font color
	c5: '#000000',
	// leave as is
	c13: '#A22929',
	// leave as is
	c17: '#80fcff',
	// not used in JS, TS - type name
	c22: '#80ffbb',
	// inherited component - JS and TS (not very used)
	c23: '#cccccc',
};

function makeTheme() {
	// -------------------------------------
	const markdown = `{
  "name": "[MARKDOWN] - Heading Punctuation",
  "scope": "punctuation.definition.heading.markdown",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "[MARKDOWN] - Heading Name Section",
  "scope": [
    "entity.name.section.markdown",
    "markup.heading.setext.1.markdown",
    "markup.heading.setext.2.markdown"
  ],
  "settings": {
    "foreground": "${scopes.c4.hex}",
    "fontStyle": "bold"
  }
},
{
  "name": "[MARKDOWN] - Paragraph",
  "scope": "meta.paragraph.markdown",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "[MARKDOWN] - Quote Punctuation",
  "scope": "beginning.punctuation.definition.quote.markdown",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[MARKDOWN] - Quote Paragraph",
  "scope": "markup.quote.markdown meta.paragraph.markdown",
  "settings": {
    "fontStyle": "italic",
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[MARKDOWN] - Separator",
  "scope": "meta.separator.markdown",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[MARKDOWN] - Emphasis Bold",
  "scope": "markup.bold.markdown",
  "settings": {
    "fontStyle": "bold",
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[MARKDOWN] - Emphasis Italic",
  "scope": "markup.italic.markdown",
  "settings": {
    "fontStyle": "italic",
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[MARKDOWN] - Lists",
  "scope": "beginning.punctuation.definition.list.markdown",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[MARKDOWN] - Link Title",
  "scope": "string.other.link.title.markdown",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[MARKDOWN] - Link/Image Title",
  "scope": [
    "string.other.link.title.markdown",
    "string.other.link.description.markdown",
    "string.other.link.description.title.markdown"
  ],
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[MARKDOWN] - Link Address",
  "scope": [
    "markup.underline.link.markdown",
    "markup.underline.link.image.markdown"
  ],
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[MARKDOWN] - Inline Code",
  "scope": ["fenced_code.block.language", "markup.inline.raw.markdown"],
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[MARKDOWN] - Code Block",
  "scope": ["fenced_code.block.language", "markup.inline.raw.markdown"],
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
}`;

	const html = `
{
  "name": "[HTML] - punctuations < /> ",
  "scope": "${pBegin}, ${pEnd}",
  "settings": {
    "foreground": "${colorDull}"
  }
},
{
  "name": "[HTML] - attribute names ",
  "scope": "entity.other.attribute-name.html",
  "settings": {
    "foreground": "${colorDull}"
  }
},
{
  "name": "[HTML] - href, xlink:href, src",
  "scope": "meta.attribute.xlink:href.html ${dq}, meta.attribute.src.html ${dq}",
  "settings": {
    "foreground": "${colorDull}"
  }
},
{
  "name": "[HTML] - inline css",
  "scope": "meta.embedded.line.css ${dq}, source.css",
  "settings": {
    "foreground": "${colorDull}"
  }
},
{
  "name": "[HTML] - alt string on image",
  "scope": "meta.attribute.alt.html ${dq} meta.tag.object.img.void.html",
  "settings": {
    "foreground": "${colorDull}"
  }
},

{
  "name": "[HTML] - SVG d, viewBox, stroke, ",
  "scope": "meta.attribute.d.html ${dq}, meta.attribute.d.html ${sq}, meta.attribute.unrecognized.viewbox.html ${dq}, meta.attribute.unrecognized.viewBox.html ${sq}, meta.attribute.stroke.html ${sq}",
  "settings": {
    "foreground": "${colorDull}"
  }
},

{
  "name": "[HTML] - svg attributes ",
  "scope": "meta.element.structure.svg.html ${sq}, meta.element.structure.svg.html ${dq}",
  "settings": {
    "foreground": "${colorDull}"
  }
},

{
  "name": "[HTML] - svg class names string",
  "scope": "meta.element.structure.svg.html meta.attribute.class.html ${sq}, meta.element.structure.svg.html meta.attribute.class.html ${dq}",
  "settings": {
    "foreground": "${scopes.c32.hex}"
  }
},

{
  "name": "[HTML] - string begin and end quotes ",
  "scope": "${stringBegin}, ${stringEnd}",
  "settings": {
    "foreground": "${colorDull}"
  }
},

{
  "name": "[HTML] - = ",
  "scope": "punctuation.separator.key-value.html",
  "settings": {
    "foreground": "${colorDull}"
  }
},

{
  "name": "[HTML] - tag ends ",
  "scope":
  "${tagEnd('metadata.script')}, ${tagEnd('structure.label')}, ${tagEnd(
		'inline.span'
	)}",
  "settings": {
    "foreground": "${colorDull}"
  }
},


{
  "name": "[HTML] - text in html ",
  "scope": "text.html.derivative",
  "settings": {
    "foreground": "${scopes.c35.hex}"
  }
},

{
  "name": "[HTML] - Entity Name",
  "scope": "text.html.basic entity.name",
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[HTML] - ID value",
  "scope": "meta.toc-list.id.html",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[HTML] - Entity Other",
  "scope": "text.html.basic entity.other",
  "settings": {
    "fontStyle": "italic",
    "foreground": "${scopes.c4.hex}"
  }
},

${tagify('div', scopes.c28.hex)},
${tagify('span', scopes.c28.hex)},

${tagify('h1', scopes.c29.hex)},
${tagify('h2', scopes.c29.hex)},
${tagify('h3', scopes.c29.hex)},
${tagify('h4', scopes.c29.hex)},
${tagify('h5', scopes.c29.hex)},
${tagify('h6', scopes.c29.hex)},

${tagify('a', scopes.c30.hex, 'inline')},
${tagify('button', scopes.c30.hex)},

${tagify('ul', scopes.c31.hex)},
${tagify('ol', scopes.c31.hex)},
${tagify('li', scopes.c31.hex)},

${tagify('svg', scopes.c32.hex, 'structure')},
${tagify('path', scopes.c32.hex)},
${tagify('g', scopes.c32.hex, 'structure', 'svg.g')},
${tagify('path', scopes.c32.hex, 'object', 'svg.path')},
${tagify('symbol', scopes.c32.hex, 'object', 'svg.symbol')},

${tagifySelfClosing('input', scopes.c33.hex, 'structure')},
${tagifySelfClosing('img', scopes.c33.hex, 'object')},

${tagify('p', scopes.c29.hex)},


{
  "name": "[HTML] - Script Tag",
  "scope": "meta.tag.metadata.script.html ${tag}",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name":
    "[HTML] - Quotes. these are a slightly different colour because expand selection will then not include quotes",
  "scope":
    "punctuation.definition.string.begin, punctuation.definition.string.end",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
}`;

	const layoutColors = `
"colors": {

  // activityBar
  "activityBar.background": "${layout.c1.hex}",
  "activityBar.border": "${layout.c2.hex}",
  "activityBar.dropBackground": "${layout.c2.hex}",
  "activityBar.foreground": "${layout.c3.hex}",
  "activityBarBadge.background": "${scopes.c4.hex}",
  "activityBarBadge.foreground": "${fixed.c5}",

  // badge
  "badge.background": "${scopes.c4.hex}",
  "badge.foreground": "${fixed.c5}",

  // button
  "button.background": "${others.comment.hex}",
  "button.foreground": "${layout.c3.hex}",
  "button.hoverBackground": "${scopes.c7.hex}",

  // contrast
  "contrastActiveBorder": null,
  "contrastBorder": "${layout.c3.hex}00",

  // debug
  "debugExceptionWidget.background": "${layout.c9.hex}",
  "debugExceptionWidget.border": "${layout.c8.hex}",
  "debugToolBar.background": "${layout.c9.hex}",

  // description
  "descriptionForeground": "${layout.c8.hex}",

  // diff
  "diffEditor.insertedTextBackground": "${scopes.c15.hex}33",
  "diffEditor.insertedTextBorder": "${scopes.c15.hex}55",
  "diffEditor.removedTextBackground": "#ee3a4333",
  "diffEditor.removedTextBorder": "#ee3a4355",

  // dropdown
  "dropdown.background": "${layout.c9.hex}",
  "dropdown.border": "${layout.c10.hex}",
  "dropdown.foreground": "${layout.c3.hex}",

  // editor
  // This is the main Background color
  "editor.background": "${layout.c9.hex}",

  // this is the main text colour
  "editor.foreground": "${layout.c3.hex}",

  // Okay this part is confusing as heck!
  // Currently found item
  "editor.findMatchBackground": "#FF720066",
  // Other Found Items int the document
  "editor.findMatchHighlightBackground": "#CAD40F66",
  // WTF is this one for? I don't know
  "editor.findRangeHighlightBackground": "#243E51",
  // When you hover over something and a popup shows, this highlights that thing
  "editor.hoverHighlightBackground": "${scopes.c4.hex}33",
  // when you have something selected, but have lost focus on the editor
  "editor.inactiveSelectionBackground": "#003b8b",
  // current line styles
  "editor.lineHighlightBackground": "${others.currentLine.hex}",
  "editor.lineHighlightBorder": "${others.currentLine.hex}",
  "editor.rangeHighlightBackground": "${others.currentLine.hex}",
  // selected Text colours
  // This is the standard Select colour
  "editor.selectionBackground": "${others.selected.hex}",
  // This is the colour of the other matching elements
  "editor.selectionHighlightBackground": "${others.selected.hex}80",
  // if you tab away you can colour it differently, but ill leave this one out
  // "editor.inactiveSelectionBackground": "${others.selected.hex}",
  // Word Highlights! This happens when you move your cursor inside a variable
  // Strong is the one where your cursor currently is
  "editor.wordHighlightStrongBackground": "${layout.c3.hex}21",
  // and this one is the rest of them
  "editor.wordHighlightBackground": "${layout.c3.hex}21",
  "editorBracketMatch.background": "${layout.c2.hex}",
  "editorBracketMatch.border": "${scopes.c4.hex}80",
  "editorCodeLens.foreground": "${layout.c8.hex}",
  "editorCursor.foreground": "${scopes.c4.hex}",
  "editorError.border": "${layout.c2.hex}",
  "editorError.foreground": "${fixed.c13}",

  // gutter
  // 66
  "editorGutter.background": "${layout.c1.hex}",
  "editorGutter.addedBackground": "#3C9F4A",
  "editorGutter.deletedBackground": "${fixed.c13}",
  "editorGutter.modifiedBackground": "#26506D",
  // editorGroup
  "editorGroup.border": "${layout.c1.hex}",
  "editorGroup.dropBackground": "${layout.c1.hex}99",
  // editorGroupHeader
  "editorGroupHeader.noTabsBackground": "${layout.c26.hex}",
  "editorGroupHeader.tabsBackground": "${layout.c26.hex}",
  "editorGroupHeader.tabsBorder": "${layout.c10.hex}",
  // editorHoverWidget
  "editorHoverWidget.background": "${layout.c10.hex}",
  "editorHoverWidget.border": "${layout.c2.hex}",
  "editorIndentGuide.background": "#3B5364",
  "editorLineNumber.foreground": "${layout.c8.hex}",
  "editorLink.activeForeground": "${layout.c8.hex}",
  // editorMarkerNavigation
  "editorMarkerNavigation.background": "#3B536433",
  "editorMarkerNavigationError.background": "${fixed.c13}",
  "editorMarkerNavigationWarning.background": "${scopes.c4.hex}",
  // ruler
  "editorOverviewRuler.border": "${layout.c2.hex}",
  "editorOverviewRuler.commonContentForeground": "${scopes.c4.hex}55",
  "editorOverviewRuler.currentContentForeground": "#ee3a4355",
  "editorOverviewRuler.incomingContentForeground": "${scopes.c15.hex}55",
  "editorRuler.foreground": "${others.currentLine.hex}",
  // editorSuggestWidget
  "editorSuggestWidget.background": "${layout.c10.hex}",
  "editorSuggestWidget.border": "${layout.c10.hex}",
  "editorSuggestWidget.foreground": "${layout.c8.hex}",
  "editorSuggestWidget.highlightForeground": "${scopes.c4.hex}",
  "editorSuggestWidget.selectedBackground": "${layout.c9.hex}",
  // editorWarning
  "editorWarning.border": "${layout.c3.hex}",
  "editorWarning.foreground": "${scopes.c4.hex}",
  "editorWhitespace.foreground": "${layout.c3.hex}1a",
  "editorWidget.background": "${layout.c10.hex}",
  "editorWidget.border": "${layout.c2.hex}",
  "errorForeground": "${fixed.c13}",
  // extensionButton
  "extensionButton.prominentBackground": "${others.comment.hex}",
  "extensionButton.prominentForeground": "${layout.c3.hex}",
  "extensionButton.prominentHoverBackground": "${scopes.c7.hex}",
  "focusBorder": "${layout.c2.hex}",
  "foreground": "${layout.c8.hex}",
  // input
  "input.background": "${layout.c9.hex}",
  "input.border": "${layout.c2.hex}",
  "input.foreground": "${scopes.c4.hex}",
  "input.placeholderForeground": "${layout.c8.hex}",
  "inputOption.activeBorder": "#8dffff",
  "inputValidation.errorBackground": "${layout.c9.hex}",
  "inputValidation.errorBorder": "${scopes.c4.hex}",
  "inputValidation.infoBackground": "${layout.c9.hex}",
  "inputValidation.infoBorder": "${layout.c2.hex}",
  "inputValidation.warningBackground": "${layout.c9.hex}",
  "inputValidation.warningBorder": "${scopes.c4.hex}",
  // list
  "list.activeSelectionBackground": "${layout.c9.hex}",
  "list.activeSelectionForeground": "${layout.c8.hex}",
  "list.dropBackground": "${layout.c2.hex}",
  "list.focusBackground": "${layout.c2.hex}",
  "list.focusForeground": "${layout.c8.hex}",
  "list.highlightForeground": "${scopes.c4.hex}",
  "list.hoverBackground": "${layout.c9.hex}",
  "list.hoverForeground": "${layout.c8.hex}",
  "list.inactiveSelectionBackground": "${layout.c2.hex}",
  "list.inactiveSelectionForeground": "${layout.c8.hex}",
  // menu
  "menu.background": "${layout.c1.hex}",
  // merge
  "merge.border": "${layout.c3.hex}",
  "merge.commonContentBackground": "#c97d0c",
  "merge.commonHeaderBackground": "#c97d0c",
  "merge.currentContentBackground": "#2F7366",
  "merge.currentHeaderBackground": "#2F7366",
  "merge.incomingContentBackground": "#185294",
  "merge.incomingHeaderBackground": "#185294",
  // notification colors - The colors below only apply for VS Code versions 1.21 and higher.
  "notificationCenter.border": "${scopes.c4.hex}",
  "notificationCenterHeader.foreground": "${layout.c8.hex}",
  "notificationCenterHeader.background": "${layout.c1.hex}",
  "notificationToast.border": "${scopes.c4.hex}",
  "notifications.foreground": "${layout.c8.hex}",
  "notifications.background": "${layout.c1.hex}",
  "notifications.border": "${scopes.c4.hex}",
  "notificationLink.foreground": "${scopes.c4.hex}",
  // panel
  "panel.background": "${layout.c1.hex}",
  "panel.border": "${layout.c2.hex}",
  "panelTitle.activeBorder": "${scopes.c4.hex}",
  "panelTitle.activeForeground": "${scopes.c4.hex}",
  "panelTitle.inactiveForeground": "${layout.c8.hex}",
  // "peekView
  "peekView.border": "${scopes.c4.hex}",
  "peekViewEditor.background": "${layout.c9.hex}",
  "peekViewEditor.matchHighlightBackground": "${layout.c9.hex}00",
  "peekViewEditorGutter.background": "${layout.c1.hex}",
  "peekViewResult.background": "${layout.c10.hex}",
  "peekViewResult.fileForeground": "${layout.c8.hex}",
  "peekViewResult.lineForeground": "${layout.c3.hex}",
  "peekViewResult.matchHighlightBackground": "${layout.c2.hex}",
  "peekViewResult.selectionBackground": "${layout.c2.hex}",
  "peekViewResult.selectionForeground": "${layout.c3.hex}",
  "peekViewTitle.background": "${layout.c10.hex}",
  "peekViewTitleDescription.foreground": "${layout.c8.hex}",
  "peekViewTitleLabel.foreground": "${scopes.c4.hex}",
  // picker
  "pickerGroup.border": "${layout.c2.hex}",
  "pickerGroup.foreground": "${layout.c8.hex}",
  // progressBar
  "progressBar.background": "${scopes.c4.hex}",
  // scrollbar
  "scrollbar.shadow": "${fixed.c5}",
  "scrollbarSlider.activeBackground": "#355166cc",
  "scrollbarSlider.background": "${others.currentLine.hex}80",
  "scrollbarSlider.hoverBackground": "#406179cc",
  // selection
  "selection.background": "${others.selected.hex}",
  // sidebar
  "sideBar.background": "${layout.c10.hex}",
  "sideBar.border": "${layout.c2.hex}",
  "sideBar.foreground": "${layout.c8.hex}",
  "sideBarSectionHeader.background": "${layout.c9.hex}",
  "sideBarSectionHeader.foreground": "${layout.c8.hex}",
  "sideBarTitle.foreground": "${layout.c8.hex}",
  // statusBar
  "statusBar.background": "${layout.c27.hex}",
  "statusBar.border": "${layout.c2.hex}",
  "statusBar.debuggingBackground": "${layout.c10.hex}",
  "statusBar.debuggingBorder": "${scopes.c4.hex}",
  "statusBar.debuggingForeground": "${scopes.c4.hex}",
  "statusBar.foreground": "${layout.c8.hex}",
  "statusBar.noFolderBackground": "${layout.c27.hex}",
  "statusBar.noFolderBorder": "${layout.c2.hex}",
  "statusBar.noFolderForeground": "${layout.c8.hex}",
  "statusBarItem.activeBackground": "${others.comment.hex}",
  "statusBarItem.hoverBackground": "${layout.c2.hex}",
  "statusBarItem.prominentBackground": "${layout.c27.hex}",
  "statusBarItem.prominentHoverBackground": "${layout.c2.hex}",
  // tab
  "tab.activeBackground": "${layout.c1.hex}",
  "tab.activeForeground": "${layout.c3.hex}",
  "tab.border": "${layout.c10.hex}",
  "tab.activeBorder": "${scopes.c4.hex}",
  "tab.inactiveBackground": "${layout.c26.hex}",
  "tab.inactiveForeground": "${layout.c8.hex}",
  "tab.unfocusedActiveForeground": "${layout.c8.hex}",
  "tab.unfocusedInactiveForeground": "${layout.c8.hex}",
  // --- workbench: terminal
  "terminal.ansiBlack": "${fixed.c5}",
  "terminal.ansiRed": "${scopes.c14.hex}",
  "terminal.ansiGreen": "${scopes.c15.hex}",
  "terminal.ansiYellow": "${scopes.c4.hex}",
  "terminal.ansiBlue": "${others.comment.hex}",
  "terminal.ansiMagenta": "${scopes.c16.hex}",
  "terminal.ansiCyan": "${fixed.c17}",
  "terminal.ansiWhite": "${layout.c3.hex}",
  "terminal.ansiBrightBlack": "${others.selected.hex}",
  "terminal.ansiBrightRed": "${scopes.c14.hex}",
  "terminal.ansiBrightGreen": "${scopes.c15.hex}",
  "terminal.ansiBrightYellow": "${scopes.c4.hex}",
  "terminal.ansiBrightBlue": "${others.comment.hex}",
  "terminal.ansiBrightMagenta": "${scopes.c16.hex}",
  "terminal.ansiBrightCyan": "${fixed.c17}",
  "terminal.ansiBrightWhite": "${layout.c9.hex}",
  "terminal.background": "${layout.c1.hex}",
  "terminal.foreground": "${layout.c3.hex}",
  "terminalCursor.background": "${scopes.c4.hex}",
  "terminalCursor.foreground": "${scopes.c4.hex}",
  // Git status colors in File Explorer
  "gitDecoration.modifiedResourceForeground": "${scopes.c4.hex}",
  "gitDecoration.deletedResourceForeground": "${scopes.c14.hex}",
  "gitDecoration.untrackedResourceForeground": "${scopes.c15.hex}",
  "gitDecoration.ignoredResourceForeground": "#808080",
  "gitDecoration.conflictingResourceForeground": "#FF7200",
  // textBlockQuote
  "textBlockQuote.background": "${layout.c9.hex}",
  "textBlockQuote.border": "${others.comment.hex}",
  "textCodeBlock.background": "${layout.c9.hex}",
  "textLink.activeForeground": "${others.comment.hex}",
  "textLink.foreground": "${others.comment.hex}",
  "textPreformat.foreground": "${scopes.c4.hex}",
  "textSeparator.foreground": "${layout.c2.hex}",
  "titleBar.activeBackground": "${layout.c10.hex}",
  "titleBar.activeForeground": "${layout.c3.hex}",
  "titleBar.inactiveBackground": "${layout.c9.hex}",
  "titleBar.inactiveForeground": "${layout.c3.hex}33",
  "walkThrough.embeddedEditorBackground": "${layout.c2.hex}",
  "welcomePage.buttonBackground": "${layout.c9.hex}",
  "welcomePage.buttonHoverBackground": "${layout.c2.hex}",
  "widget.shadow": "${fixed.c5}26"
}`;

	const css = `
{
  "name": "[CSS] - Entity",
  "scope": ["source.css entity", "source.stylus entity"],
  "settings": {
    "foreground": "${scopes.c15.hex}"
  }
},
{
  "name": "[CSS] - ID Selector",
  "scope": "entity.other.attribute-name.id.css",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},

{
  "name": "[CSS] - psudeo class",
  "scope": "entity.other.attribute-name.pseudo-class.css",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "[CSS] - Element Selector",
  "scope": "entity.name.tag",
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[CSS] - Support",
  "scope": ["source.css support", "source.stylus support"],
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[CSS] - Constant",
  "scope": [
    "source.css constant",
    "source.css support.constant",
    "source.stylus constant",
    "source.stylus support.constant"
  ],
  "settings": {
    "foreground": "${scopes.c20.hex}"
  }
},
{
  "name": "[CSS] - String",
  "scope": [
    "source.css string",
    "source.css punctuation.definition.string",
    "source.stylus string",
    "source.stylus punctuation.definition.string"
  ],
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[CSS] - Variable",
  "scope": ["source.css variable", "source.stylus variable"],
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
}`;

	const ini = `
{
  "name": "[INI] - Entity",
  "scope": "source.ini entity",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "[INI] - Keyword",
  "scope": "source.ini keyword",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[INI] - Punctuation Definition",
  "scope": "source.ini punctuation.definition",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[INI] - Punctuation Separator",
  "scope": "source.ini punctuation.separator",
  "settings": {
    "foreground": "${scopes.c7.hex}"
  }
}
`;

	const js = `
{
  "name": "[JAVASCRIPT] - Storage Type Function",
  "scope": "source.js storage.type.function",
  "settings": {
    "foreground": "${scopes.c16.hex}"
  }
},
{
  "name": "[JAVASCRIPT] - Variable Language",
  "scope": "variable.language, entity.name.type.class.js",
  "settings": {
    "foreground": "${scopes.c16.hex}"
  }
},
{
  "name": "[JAVASCRIPT] - Inherited Component",
  "scope": "entity.other.inherited-class.js",
  "settings": {
    "foreground": "${fixed.c23}"
  }
},
{
  "name": "[JAVASCRIPT] - Variable other Properties",
  "scope" : "variable.other.property.js",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[JAVASCRIPT] - JS objects",
  "scope" : "variable.other.object.js",
  "settings": {
    "foreground": "${scopes.c25.hex}"
  }
}
`;

	const generic = `
{
  "name": "Comment",
  "scope": ["comment", "punctuation.definition.comment"],
  "settings": {
    "fontStyle": "italic",
    "foreground": "${others.comment.hex}"
  }
},
{
  "name": "Constant",
  "scope": "constant",
  "settings": {
    "foreground": "${scopes.c14.hex}"
  }
},
{
  "name": "Entity",
  "scope": "entity",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "Invalid",
  "scope": "invalid",
  "settings": {
    "foreground": "#f44542"
  }
},
{
  "name": "Storage Type Function",
  "scope": "storage.type.function",
  "settings": {
    "foreground": "${scopes.c7.hex}"
  }
},
{
  "name": "Keyword",
  "scope": "keyword, storage.type.class",
  "settings": {
    "foreground": "${scopes.c7.hex}"
  }
},
{
  "name": "Meta",
  "scope": "meta",
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
    "name": "Meta JSX",
    "scope": [
        "meta.jsx.children",
        "meta.jsx.children.js",
        "meta.jsx.children.tsx"
    ],
    "settings": {
        "foreground": "${scopes.c21.hex}"
    }
},
{
  "name": "Meta Brace",
  "scope": "meta.brace",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "Punctuation",
  "scope": "punctuation",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "Punctuation Parameters",
  "scope": "punctuation.definition.parameters",
  "settings": {
    "foreground": "${scopes.c20.hex}"
  }
},
{
  "name": "Punctuation Template Expression",
  "scope": "punctuation.definition.template-expression",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "Storage",
  "scope": "storage",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "Storage Type Arrow Function",
  "scope": "storage.type.function.arrow",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "String",
  "scope": ["string", "punctuation.definition.string"],
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "String Template",
  "scope": ["string.template", "punctuation.definition.string.template"],
  "settings": {
    "foreground": "${scopes.c15.hex}"
  }
},
{
  "name": "Support",
  "scope": "support",
  "settings": {
    "foreground": "${fixed.c22}"
  }
},
{
  "name": "Support Function",
  "scope": "support.function",
  "settings": {
    "foreground": "${scopes.c7.hex}"
  }
},
{
  "name": "Support Variable Property DOM",
  "scope": "support.variable.property.dom",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "Variable",
  "scope": "variable",
  "settings": {
    "foreground": "${scopes.c24.hex}"
  }
}
`;

	const json = `
{
  "name": "[JSON] - Support",
  "scope": "source.json support",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[JSON] - String",
  "scope": [
    "source.json string",
    "source.json punctuation.definition.string"
  ],
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
}
`;

	const pug = ` {
  "name": "[PUG] - Entity Name",
  "scope": "text.jade entity.name",
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[PUG] - Entity Attribute Name",
  "scope": "text.jade entity.other.attribute-name.tag",
  "settings": {
    "fontStyle": "italic"
  }
},
{
  "name": "[PUG] - String Interpolated",
  "scope": "text.jade string.interpolated",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
}`;

	const ts = `
{
  "name": "[TYPESCRIPT] - Entity Name Type",
  "scope": "source.ts entity.name.type",
  "settings": {
    "foreground": "${fixed.c22}"
  }
},
{
  "name": "[TYPESCRIPT] - Keyword",
  "scope": "source.ts keyword",
  "settings": {
    "foreground": "${scopes.c4.hex}"
  }
},
{
  "name": "[TYPESCRIPT] - Punctuation Parameters",
  "scope": "source.ts punctuation.definition.parameters",
  "settings": {
    "foreground": "${scopes.c19.hex}"
  }
},
{
  "name": "[TYPESCRIPT] - Punctuation Arrow Parameters",
  "scope": "meta.arrow.ts punctuation.definition.parameters",
  "settings": {
    "foreground": "${scopes.c21.hex}"
  }
},
{
  "name": "[TYPESCRIPT] - Storage",
  "scope": "source.ts storage",
  "settings": {
    "foreground": "${scopes.c18.hex}"
  }
},
{
  "name": "[TYPESCRIPT] - Variable Language",
  "scope": "variable.language, entity.name.type.class.ts, entity.name.type.class.tsx",
  "settings": {
    "foreground": "${scopes.c16.hex}"
  }
},
{
  "name": "[TYPESCRIPT] - Inherited Component",
  "scope": "entity.other.inherited-class.ts, entity.other.inherited-class.tsx",
  "settings": {
    "foreground": "${fixed.c23}"
  }
}
`;

	const python = `
{
  "name": "[PYTHON] - Self Argument",
  "scope": "variable.parameter.function.language.special.self.python",
  "settings": {
    "foreground": "${scopes.c16.hex}"
  }
}
`;

	const operatorMono = `
{
  "name": "Italicsify for Operator Mono",
  "scope": [
    "modifier",
    "this",
    "comment",
    "storage.modifier.js",
    "storage.modifier.ts",
    "storage.modifier.tsx",
    "entity.other.attribute-name.js",
    "entity.other.attribute-name.ts",
    "entity.other.attribute-name.tsx",
    "entity.other.attribute-name.html"
  ],
  "settings": {
    "fontStyle": "italic"
  }
}
`;

	document.querySelector('textarea').textContent = `{
    "$schema": "vscode://schemas/color-theme",
    "name": "YOUR-THEME-NAME",
    "type": "dark",
    ${layoutColors},

    "tokenColors": [
      ${generic},
      ${html},
      ${css},
      ${markdown},
      ${ini},
      ${js},
      ${json},
      ${pug},
      ${ts},
      ${python},
      ${operatorMono}
    ]
  }
  `;
}
