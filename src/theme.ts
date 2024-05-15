
export function getCurrentTheme(){
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const local = localStorage.getItem('theme');
      if (local) {
        return local;
      }
    }
    return 'default'; // or some other default value
  }