import Fuse from "fuse.js"

export function searchStore(arry: any, query: string) {
    const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name','email','id']
      }
      const fuse = new Fuse(arry, options)

      const result = fuse.search(query)
      return result
}