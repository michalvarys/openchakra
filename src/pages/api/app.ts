export default function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return res.send({})
        }
        default:
            throw new Error('Not implemented')
    }
} 