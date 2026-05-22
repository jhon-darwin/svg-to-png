const express = require('express')
const sharp = require('sharp')

const app = express()
app.use(express.json({ limit: '10mb' }))

app.get('/', (req, res) => {
  res.send('SVG to PNG converter funcionando ✅')
})

app.post('/convert', async (req, res) => {
  try {
    const { svg } = req.body
    if (!svg) return res.status(400).json({ error: 'Falta el campo svg' })

    const svgBuffer = Buffer.from(svg)
    const pngBuffer = await sharp(svgBuffer)
      .png()
      .toBuffer()

    res.set('Content-Type', 'image/png')
    res.send(pngBuffer)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))