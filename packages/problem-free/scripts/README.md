# Podcast Audio Generation Script

This script is used to generate (mock) audio files for podcast scripts associated with each programming problem.

## Usage

To run the script, navigate to the `packages/problem-free` directory and execute the following command:

```bash
bun run generate-audio
```

This will iterate through all problem directories within `packages/problem-free` (excluding `scripts` and `node_modules`). For each problem, it will:

1. Look for a `podcast_script.md` file.
2. If found, it will call a (currently mocked) audio generation function.
3. This mock function will create an empty audio file named `<problem-name>_audio.mp3` in the problem's directory.
4. It will log the progress and any errors encountered.

If a `podcast_script.md` file is not found for a particular problem, a warning will be logged, and that problem will be skipped.

## Output

The script will create empty `.mp3` files in each problem's directory (e.g., `packages/problem-free/3sum/3sum_audio.mp3`). Logs will be printed to the console indicating the success or failure of audio generation for each problem.
