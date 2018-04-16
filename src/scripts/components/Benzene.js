import Hexagone from './Hexagone'

import { context } from './Canvas'

export default class Benzene
{
    constructor(x, y, radius, height, ratio, bond, removed)
    {
        this.x       = x
        this.y       = y
        this.radius  = radius
        this.height  = height
        this.ratio   = ratio
        this.bond    = bond
        this.removed = removed
        this.draw()
    }

    draw()
    {
        // Hexagone
        const hexagone = new Hexagone(this.x, this.y, this.radius, false, true)

        // Double bond
        context.beginPath()
        if (this.removed != 'top-right')
        {
            context.moveTo(this.x + this.ratio,     this.y)
            context.lineTo(this.x + this.ratio / 2, this.y - this.bond)
        }
        if (this.removed != 'top-left')
        {
            context.moveTo(this.x - this.ratio / 2, this.y - this.bond)
            context.lineTo(this.x - this.ratio,     this.y)
        }
        if (this.removed != 'bottom')
        {
            context.moveTo(this.x - this.ratio / 2, this.y + this.bond)
            context.lineTo(this.x + this.ratio / 2, this.y + this.bond)
        }
        context.lineWidth = this.radius / 25
        context.stroke()
        context.closePath()
    }
}