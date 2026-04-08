import { BlobServiceClient } from '@azure/storage-blob'

const ALLOWED_CONTAINERS = ['aes-boletins', 'aes-galeria', 'aes-documentos']

function getClient() {
  const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connStr) throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set')
  return BlobServiceClient.fromConnectionString(connStr)
}

function getAccountUrl(): string {
  const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING ?? ''
  const match = connStr.match(/AccountName=([^;]+)/)
  const accountName = match?.[1] ?? 'aeshotsitefiles'
  return `https://${accountName}.blob.core.windows.net`
}

export function getBlobUrl(container: string, path: string): string {
  return `${getAccountUrl()}/${container}/${path}`
}

export async function uploadBlob(
  container: string,
  blobPath: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  if (!ALLOWED_CONTAINERS.includes(container)) {
    throw new Error(`Container "${container}" is not allowed`)
  }

  const client = getClient()
  const containerClient = client.getContainerClient(container)
  const blockBlobClient = containerClient.getBlockBlobClient(blobPath)

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  })

  return getBlobUrl(container, blobPath)
}

export async function deleteBlob(container: string, blobPath: string): Promise<boolean> {
  if (!ALLOWED_CONTAINERS.includes(container)) return false

  try {
    const client = getClient()
    const containerClient = client.getContainerClient(container)
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath)
    await blockBlobClient.deleteIfExists()
    return true
  } catch (error) {
    console.error(`deleteBlob ${container}/${blobPath}:`, error)
    return false
  }
}
