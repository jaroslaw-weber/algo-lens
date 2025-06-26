import fs from 'fs/promises';
import path from 'path';

const problemsDir = path.join(__dirname, '..');

async function generateAudioFromScript(scriptContent: string, outputPath: string): Promise<void> {
  console.log(`Mocking audio generation for: ${outputPath}`);
  // In a real scenario, this function would call an API to generate audio.
  // For now, we'll just create an empty file.
  await fs.writeFile(outputPath, '');
  console.log(`Successfully created empty audio file at: ${outputPath}`);
}

async function main() {
  try {
    const problemNames = (await fs.readdir(problemsDir, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory() && dirent.name !== 'scripts' && dirent.name !== 'node_modules')
      .map(dirent => dirent.name);

    for (const problemName of problemNames) {
      const problemPath = path.join(problemsDir, problemName);
      const podcastScriptPath = path.join(problemPath, 'podcast_script.md');
      const audioOutputPath = path.join(problemPath, `${problemName}_audio.mp3`);

      try {
        const scriptContent = await fs.readFile(podcastScriptPath, 'utf-8');
        await generateAudioFromScript(scriptContent, audioOutputPath);
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          console.warn(`Skipping ${problemName}: podcast_script.md not found at ${podcastScriptPath}`);
        } else {
          console.error(`Error processing problem ${problemName}:`, error);
        }
      }
    }
    console.log('\nMock audio generation complete for all problems.');
  } catch (error) {
    console.error('Failed to generate podcast audio:', error);
    process.exit(1);
  }
}

main();
