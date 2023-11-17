import project from '../package.json';

export default {
  logo: (
    'Vidra'
  ),
  project: {
    link: 'https://github.com/ramynn/vidra'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Vidra'
    }
  },
  footer: {
    text: (
      <span>
        <a href="https://github.com/ramynn/vidra" target="_blank">
          Vidra
        </a>
        . <small>Version {project.version}</small>
      </span>
    )
  }
}
