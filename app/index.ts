import { serve } from 'bun'
import app from './app'

const port = 8080

serve({ port, fetch: app.fetch })
