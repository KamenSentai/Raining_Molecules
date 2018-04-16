import Canvas   from './Canvas'
import Parallax from './Parallax'
import Mouse    from './Mouse'

import { $canvas }   from './Canvas'
import { molecules } from './Canvas'

const canvas   = new Canvas(molecules)
const parallax = new Parallax()
const mouse    = new Mouse()

export default class Animation
{
    constructor()
    {
        this.setAnimation()
    }

    setAnimation()
    {
        // Set animation frame
        if (!Modernizr.touchevents)
        {
            if ($canvas != undefined)
            {
                const loop = () =>
                {
                    canvas.setFrame()
                    parallax.setView()
                    mouse.setMovement()
                    window.requestAnimationFrame(loop)
                }
                loop()
            }
            else
            {
                const loop = () =>
                {
                    parallax.setView()
                    mouse.setMovement()
                    window.requestAnimationFrame(loop)
                }
                loop()
            }
        }
        else
        {
            let alphaAngle = 0
            let betaAngle  = 90
            let gammaAngle = 0

            // Reduce angle to [0deg, 360deg[
            const moduloAngle = (angle) =>
            {
                return ((angle % 360)+ 360) % 360
            }

            // Reduce angle to [-180deg, 180deg[
            const reduceAngle = (angle) =>
            {
                return (moduloAngle(angle) + 180) % 360 - 180
            }

            // Listen to device orientation
            window.addEventListener('deviceorientation', (event) =>
            {
                alphaAngle = event.alpha
                betaAngle  = event.beta
                gammaAngle = event.gamma
            })

            if ($canvas != undefined)
            {

                const loop = () =>
                {
                    // Move molecule
                    for (const molecule of molecules)
                    {
                        molecule.x += reduceAngle(gammaAngle) * 0.005
                        molecule.rotate = Math.abs(molecule.rotate) * (moduloAngle(gammaAngle) > 180 ? - 1 : 1)
                    }
                    canvas.setFrame()
                    parallax.setView(reduceAngle(alphaAngle) / 180, (reduceAngle(betaAngle) - 90 )/ 180 - 0.5)
                    window.requestAnimationFrame(loop)
                }
                loop()
            }
            else
            {
                const loop = () =>
                {
                    parallax.setView(reduceAngle(alphaAngle) / 180, (reduceAngle(betaAngle - 90)) / 180 - 0.5)
                    window.requestAnimationFrame(loop)
                }
                loop()
            }
        }
    }
}