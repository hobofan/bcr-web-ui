import ModulePage, { VersionInfo } from '../[module]'
import { GetStaticProps } from 'next'
import {
  extractModuleInfo,
  getModuleMetadata,
  getSubmissionCommitOfVersion,
  listModuleNames,
  listModuleVersions,
} from '../../../data/utils'
import compareVersions from 'compare-versions'
import { getStaticPropsModulePage } from '../moduleStaticProps'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { module, version } = params as any

  return await getStaticPropsModulePage(module, version)
}

export async function getStaticPaths() {
  const modulesNames = await listModuleNames()

  const paths = (
    await Promise.all(
      modulesNames.map(async (name) => {
        const versions = await listModuleVersions(name)
        return versions.map((version) => {
          return {
            params: { module: name, version },
          }
        })
      })
    )
  ).flatMap((n) => n)

  return {
    paths,
    // TODO: fallback true?
    fallback: false,
  }
}

export default ModulePage
