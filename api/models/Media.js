const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const MediaSchema = mongoose.Schema({

  category: String, // TODO criar rotina para transferir este valor para categories e excluir este campo
  categories: [String],
  tags: [String],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  picture: Object, // TODO transferir dados dos legados e remover este campo
  image: {
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  },
  documents: [Object], // TODO transferir dados dos legados e remover este campo
  docs: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
  url: String,
  oembed: String,
  oembed_thumb: String,
  publishing_date: Date,
  publishing_date_format: {
    type: String,
    default: 'DD/MM/YYYY'
  },
  publishing_house: String, // Editora

  aditional_infos: [Object], // TODO Copiar este valor para a correção abaixo e remover este campo
  additional_infos: [Object], // Informações adicionais
  type: String, // Tipo de documento
  authors: [Object], // Autores
  city: String, // Cidade
  organizers: [Object], // Organizadores
  doi: String, // Identificador de Objeto Digital
  institution: String, // Instituição
  number: String, // Número da publicação
  languages: [String], // Idiomas
  notes: String, // Anotações
  pages: String, // Páginas
  patent_legal_status: String, // Disponibilidade
  source: String, // Fonte
  volume: String // Volume
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

MediaSchema.plugin(require('mongoose-autopopulate'))

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema)
module.exports = Media
