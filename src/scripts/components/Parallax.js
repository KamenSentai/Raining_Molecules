export default class Parallax
{
    constructor()
    {
        this.setSettings()
        this.setMouse()
    }

    setSettings()
    {
        const $elements = document.querySelectorAll('.js-parallax')

        this.settings = new Array()

        // Set settings
        for (const $element of $elements)
        {
            const setting = {}
            setting.$element  = $element
            setting.amplitude = parseFloat($element.dataset.amplitude)
            setting.offsetX   = 0
            setting.offsetY   = 0

            this.settings.push(setting)

            $element.style.willChange = 'transform'
        }
    }

    setMouse()
    {
        // Get mouse position
        this.mouse   = {}
        this.mouse.x = 0
        this.mouse.y = 0

        // Get window size
        let windowWidth  = window.innerWidth
        let windowHeight = window.innerHeight

        // Create amplitude
        this.amplitudeX = windowWidth / 10
        this.amplitudeY = windowHeight / 10

        // Update values
        window.addEventListener('resize', () =>
        {
            windowWidth     = window.innerWidth
            windowHeight    = window.innerHeight
            this.amplitudeX = windowWidth / 10
            this.amplitudeY = windowHeight / 10
        })

        // Get ratio
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / windowWidth - 0.5
            this.mouse.y = event.clientY / windowHeight - 0.5
        })
    }

    setView(alpha = 0, beta = 0.5)
    {
        if (!Modernizr.touchevents)
        {
            for (const setting of this.settings)
            {
                // Get movement
                const targetOffetX = - this.mouse.x * this.amplitudeX * setting.amplitude
                const targetOffetY = - this.mouse.y * this.amplitudeY * setting.amplitude
    
                // Create easing
                setting.offsetX += (targetOffetX - setting.offsetX) * 0.05
                setting.offsetY += (targetOffetY - setting.offsetY) * 0.05
    
                const roundedOffsetX = Math.round(setting.offsetX * 100) / 100
                const roundedOffsetY = Math.round(setting.offsetY * 100) / 100
    
                // Set movement
                setting.$element.style.transform = `translate(${roundedOffsetX}px, ${roundedOffsetY}px)`
            }
        }

        else
        {
            for (const setting of this.settings)
            {
                // Get movement
                const targetOffetX = - this.amplitudeX * setting.amplitude * alpha
                const targetOffetY = - this.amplitudeY * setting.amplitude * beta
    
                // Create easing
                setting.offsetX += (targetOffetX - setting.offsetX) * 0.05
                setting.offsetY += (targetOffetY - setting.offsetY) * 0.05
    
                const roundedOffsetX = Math.round(setting.offsetX * 100) / 100
                const roundedOffsetY = Math.round(setting.offsetY * 100) / 100
    
                // Set movement
                setting.$element.style.transform = `translate(${roundedOffsetX}px, ${roundedOffsetY}px)`
            }
        }
    }
}