import './render.css';

export default () => {
  const heading = '<h1 class="render__heading">Hello from renderer</h1>';
  const paragraph = '<p class="render__paragraph">This is a paragraph</p>';
  const input = '<input />'
  return heading + paragraph + input;
}
