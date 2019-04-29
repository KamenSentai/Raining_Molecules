import Benzene from './Benzene'

import { $canvas } from './Canvas'
import { context } from './Canvas'

export default class Molecule {
  constructor(name) {
    if ($canvas != undefined) {
      $canvas.width  = window.innerWidth
      $canvas.height = window.innerHeight
      this.translate = 0
      this.name      = name
      this.init()
      this.draw()
    }
  }

  init() {
    // Initialize parameters
    this.radius = Math.floor(Math.random() * 12.5 + 12.5)
    this.x      = Math.floor(Math.random() * $canvas.width)
    this.y      = - this.radius - Math.floor(Math.random() * $canvas.height)
    this.height = Math.sqrt(this.radius ** 2 - (this.radius / 2) ** 2)
    this.ratio  = this.radius * 0.75
    this.bond   = Math.sqrt((this.radius * 0.75) ** 2 - ((this.radius * 0.75 )/ 2) ** 2)
    this.angle  = Math.floor(Math.random() * Math.PI)
    this.rotate = (Math.floor(Math.random() * 10) / 1000) * (this.x < $canvas.width / 2 ? - 1 : 1)
    this.speed  = Math.floor(Math.random() * 1.25) + 1.25
  }

  draw() {
    // Draw molecule
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.translate(- this.x, - this.y)

    if (this.name == 'benzene') {
      new Benzene(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined)
      this.size = this.radius
    } else if (this.name == 'naphtalene') {
      new Benzene(this.x, this.y - this.height, this.radius, this.height,   this.ratio,   this.bond, undefined)
      new Benzene(this.x, this.y + this.height, this.radius, this.height, - this.ratio, - this.bond, 'bottom')
      this.size = this.radius * 4
    } else if (this.name == 'diphenyle') {
      new Benzene(this.x - this.radius * 1.5, this.y, this.radius, this.height,   this.ratio,   this.bond, undefined)
      new Benzene(this.x + this.radius * 1.5, this.y, this.radius, this.height, - this.ratio, - this.bond, undefined)
      context.beginPath()
      context.moveTo(this.x - this.radius / 2, this.y)
      context.lineTo(this.x + this.radius / 2, this.y)
      context.stroke()
      context.closePath()
      this.size = this.radius * 5
    } else if (this.name == 'styrene') {
      new Benzene(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined)
      context.beginPath()
      context.moveTo(this.x + this.radius,                      this.y)
      context.lineTo(this.x + this.radius * 2,                  this.y)
      context.lineTo(this.x + this.radius * 2.5,                this.y + this.height)
      context.moveTo(this.x + this.radius * 3 - this.ratio,     this.y)
      context.lineTo(this.x + this.radius * 3 - this.ratio / 2, this.y + this.bond)
      context.stroke()
      context.closePath()
      this.size = this.radius * 4
    } else if (this.name == 'coronene') {
      new Benzene(this.x,                     this.y - this.height * 2, this.radius, this.height, - this.ratio, - this.bond, 'top-left')
      new Benzene(this.x - this.radius * 1.5, this.y - this.height,     this.radius, this.height,   this.ratio,   this.bond, 'top-right')
      new Benzene(this.x - this.radius * 1.5, this.y + this.height,     this.radius, this.height, - this.ratio, - this.bond, 'bottom')
      new Benzene(this.x,                     this.y + this.height * 2, this.radius, this.height,   this.ratio,   this.bond, 'top-left')
      new Benzene(this.x + this.radius * 1.5, this.y + this.height,     this.radius, this.height, - this.ratio, - this.bond, 'top-right')
      new Benzene(this.x + this.radius * 1.5, this.y - this.height,     this.radius, this.height,   this.ratio,   this.bond, 'bottom')
      this.size = this.radius * 6
    }
    context.restore()
  }
}
