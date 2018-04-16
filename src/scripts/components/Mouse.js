import { molecules } from './Canvas'

export default class Mouse
{
    constructor()
    {
        if (!Modernizr.touchevents)
        {
            this.setSettings()
            this.moveMouse()
            this.setMovement()
        }
    }

    setSettings()
    {
        // Create elements
        const $body       = document.body
        const $mouse      = document.createElement('div')
        const $pointer    = document.createElement('div')
        const $particles  = document.createElement('div')
        const $particle_1 = document.createElement('div')
        const $particle_2 = document.createElement('div')
        const $particle_3 = document.createElement('div')

        // Add classes
        $mouse.classList.add('mouse')
        $pointer.classList.add('pointer')
        $particles.classList.add('particles')
        $particle_1.classList.add('particle')
        $particle_2.classList.add('particle')
        $particle_3.classList.add('particle')
        $particle_1.classList.add('index-1')
        $particle_2.classList.add('index-2')
        $particle_3.classList.add('index-3')

        // Add elements
        $particles.appendChild($particle_1)
        $particles.appendChild($particle_2)
        $particles.appendChild($particle_3)
        $mouse.appendChild($pointer)
        $mouse.appendChild($particles)
        $body.insertBefore($mouse, $body.firstChild)

        // Get elements
        this.mouse     = $mouse
        this.pointer   = $pointer
        this.particles = $particles

        // Get positions
        this.position = { x : window.innerWidth / 2, y : window.innerHeight / 2 }
        this.offset   = { x : window.innerWidth / 2, y : window.innerHeight / 2 }
    }

    moveMouse()
    {
        // Update mouse position
        window.addEventListener('mousemove', (event) =>
        {
            this.position.x = event.clientX
            this.position.y = event.clientY
        })
    }

    setMovement()
    {
        // Move molecule
        for (const molecule of molecules)
        {
            molecule.x += (molecule.x - this.offset.x) * 0.0025
            molecule.rotate = Math.abs(molecule.rotate) * (molecule.x < this.position.x ? - 1 : 1)
        }

        // Set easings
        this.offset.x += (this.position.x - this.offset.x) * 0.05
        this.offset.y += (this.position.y - this.offset.y) * 0.05

        // Set positions
        this.pointer.style.transform   = `translate(${this.position.x}px, ${this.position.y}px)`
        this.particles.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`
    }
}