import { useEffect, useState } from 'react';
import { getCurrentTheme } from '../../../frontend/theme';
const themes = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
  'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk',
  'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
];

const ThemeSelector = () => {
  
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="p-4">
      <label className="label">
        <span className="label-text">Select Theme</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
