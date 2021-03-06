import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

const options = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{
    header: 1
  }, {
    header: 2
  }], // custom button values
  [{
    list: 'ordered'
  }, {
    list: 'bullet'
  }],
  [{
    script: 'sub'
  }, {
    script: 'super'
  }], // superscript/subscript
  [{
    indent: '-1'
  }, {
    indent: '+1'
  }], // outdent/indent
  [{
    direction: 'rtl'
  }], // text direction

  [{
    size: ['small', false, 'large', 'huge']
  }], // custom dropdown
  [{
    header: [1, 2, 3, 4, 5, 6, false]
  }],

  [{
    color: []
  }, {
    background: []
  }], // dropdown with defaults from theme
  [{
    font: []
  }],
  [{
    align: []
  }],
  ['image', 'video', 'link', 'iframe'],
  ['clean'] // remove formatting button
]
Vue.use(VueQuillEditor, {
  modules: {
    toolbar: {
      container: options,
      handlers: {
        image: () => {
          document.getElementById('quillfile').click()
        },
        iframe() {
          const html = prompt('Insira o código para embedar:')
          const range = this.quill.getSelection()
          this.quill.clipboard.dangerouslyPasteHTML(range.index, html)
        }
      }
    }
  }
})
