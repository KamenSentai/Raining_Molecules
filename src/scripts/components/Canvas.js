import Molecule from './Molecule'

// Get canvas
export const $canvas = document.querySelector('canvas')
export const context = $canvas != undefined ? $canvas.getContext('2d') : undefined

// Create molecules
const number    = Math.round((screen.width + screen.height) / 2 / 250)
const molecules = new Array()
for (let i = 0; i < number; i++)
{
    const benzene    = new Molecule('benzene')
    const naphtalene = new Molecule('naphtalene')
    const diphenyle  = new Molecule('diphenyle')
    const styrene    = new Molecule('styrene')
    const coronene   = new Molecule('coronene')
    molecules.push(benzene)
    molecules.push(naphtalene)
    molecules.push(diphenyle)
    molecules.push(styrene)
    molecules.push(coronene)
}
export { molecules as molecules }

export default class Canvas
{
    constructor(molecules)
    {
        if ($canvas != undefined)
        {
            this.molecules = molecules
            this.setResize()
        }
    }

    setResize()
    {
        // Resize canvas
        const resize = () =>
        {
            $canvas.width  = window.innerWidth
            $canvas.height = window.innerHeight
            this.largest   = Math.max($canvas.width, $canvas.height)
            $canvas.style.position = 'absolute'
        }
        resize()
        
        window.addEventListener('resize', resize)
    }
    
    setFrame()
    {
        context.clearRect(0, 0, $canvas.width, $canvas.height)

        // Draw molecules
        for (const molecule of this.molecules)
        {
            const opacity = 1 - (molecule.y + molecule.size) / $canvas.height
            context.strokeStyle = `rgba(238, 238, 238, ${opacity})`
            molecule.draw()

            // Update parameters
            molecule.translate = Math.E ** (((molecule.y + $canvas.height) / (2 * $canvas.height)) * molecule.speed)
            molecule.y     += molecule.translate
            molecule.angle += molecule.rotate
            if
            (
                molecule.x + molecule.size < 0             ||
                molecule.x - molecule.size > $canvas.width ||
                molecule.y - molecule.size > $canvas.height
            )
            {
                molecule.init()
            }
        }
    }
}