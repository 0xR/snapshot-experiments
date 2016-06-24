import styles from './render.css';

console.log(styles);
export default () => {
  const heading = `<h1 class="${styles.heading}">Hello from renderer</h1>`;
  const paragraph = `<p class="${styles.paragraph}">This is a paragraph</p>`;
  const input = '<input />';
  return heading + paragraph + input;
};
