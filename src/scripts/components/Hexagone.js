import { context } from './Canvas'

export default class Hexagone
{
    constructor(x, y, radius, fill, stroke)
    {
        this.x      = x
        this.y      = y
        this.radius = radius
        this.height = Math.sqrt(this.radius ** 2 - (this.radius / 2) ** 2)
        this.fill   = fill
        this.stroke = stroke
        this.draw()
    }

    draw()
    {
        // Draw hexagone
        context.beginPath()
        context.moveTo(this.x + this.radius,     this.y)
        context.lineTo(this.x + this.radius / 2, this.y - this.height)
        context.lineTo(this.x - this.radius / 2, this.y - this.height)
        context.lineTo(this.x - this.radius,     this.y)
        context.lineTo(this.x - this.radius / 2, this.y + this.height)
        context.lineTo(this.x + this.radius / 2, this.y + this.height)
        context.lineTo(this.x + this.radius,     this.y)
        if (this.fill)
        {
            context.fill()
        }
        if (this.stroke)
        {    
            context.lineWidth = this.radius / 25
            context.stroke()
        }
        context.closePath()
    }
}