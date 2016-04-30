$(function() {
    // codemirror
    codemirror = CodeMirror.fromTextArea(document.getElementById('content'), {
        lineNumbers: false,
        lineWrapping: true,
        indentWithTabs: false,
        scrollbarStyle: null,
        tabSize: 4,
        indentUnit: 4,
        mode: 'markdown',
        theme: 'base16-light',
        keyMap: 'vim'
    });

    // markdown-it
    md = window.markdownit({
        html: true,
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, code).value;
                } catch (__) {}
            }
            return '';
        }
    });
    md.use(window.markdownitEmoji);
    md.renderer.rules.emoji = function(token, idx) {
        return window.twemoji.parse(token[idx].content);
    };
    md.use(window.markdownitFootnote);

    // directive setup
    Vue.directive('codemirror', {
        twoWay: true,
        bind: function() {
            this.codemirror = codemirror;
            this.codemirror.on('change', function() {
                this.set(this.codemirror.getValue());
            }.bind(this));
        },
        update: function(value, oldValue) {
            this.codemirror.setValue(value || this.el.value);
        }
    });

    // app
    new Vue({
        el: 'html',
        data: {
            content: ''
        },
        filters: {
            markdownit: function(value) {
                return md.render(value);
            }
        }
    });
})
