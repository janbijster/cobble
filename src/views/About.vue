<template>
  <div class="about">
    <h1 id="cobble">About Cobble</h1>
    <p>Visual creative coding in the browser!</p>
    <p>
      <img src="@/assets/images/cobble-reel.gif" alt="cobble examples" />
    </p>
    <h2 id="quick-2-min-demo-sketch">Quick 2 min demo sketch</h2>
    <p>
      <a href="https://youtu.be/oILrJw5bNsY">
        <img src="@/assets/images/cobble-youtube.jpg" />
      </a>
    </p>
    <p><a href="https://youtu.be/oILrJw5bNsY">view on youtube</a></p>
    <h2 id="overview">Overview</h2>
    <p>Cobble is node editor built around P5.js.</p>
    <p>
      The goal of the project is to create an easy low-threshold environment to
      get introduced to the field of creative coding.
    </p>
    <p>
      Simply drag building blocks (cobblestones) from the list into the field
      and connect outputs to inputs. Clicking on an input connector clears the
      connection.
    </p>
    <p>
      Connections can also be created or changed in the inspector on the left,
      after selecting a block. Clicking the orange 'edit' button in this
      inspector allows you to edit default values for variables. Use this for
      unconnected inputs that should have a constant value.
    </p>
    <p>
      Blocks are executed from left to right order, so you probably want to put
      your clearBackground block on the left side.
    </p>
    <p>
      Click run to start the sketch. You can save your projects in the cloud
      tab.
    </p>
    <h2 id="editable-blocks">Editable blocks</h2>
    <p>
      There are editable input, process and output blocks. You can edit the
      internal code of these blocks. The code of these editable blocks may run a
      little slower because it gets executed using
      <a href="https://neil.fraser.name/software/JS-Interpreter/docs.html"
        >Neil Fraser's js-interpreter</a
      >, for security reasons.
    </p>
    <p>
      A how-to on how to access the inputs and outputs and available p5
      functions is coming soon (See todo list below). Feel free to
      <a href="mailto:info@janbijster.com">email me</a> or start a github issue
      if you want me give this priority.
    </p>
    <h2 id="roadmap">Roadmap</h2>
    <p>
      Cobble is currently in an alpha version. I am rolling out incremental
      updates whenever I find the time. The following is on my todo list for the
      application:
    </p>
    <h3>Features</h3>
    <ul>
      <li>Drag a buildingblock of the field to delete</li>
      <li>Drag a connection away to delete the connection</li>
      <li>
        Copy and paste a building block or group of connected building blocks
      </li>
      <li>
        Be able to select a group of blocks and turn them into group-block
      </li>
      <li>
        Loop block: a block with an index as output. Every block (indirectly)
        connected to this index is executed n times, with the index
        incrementing.
      </li>
      <li>Gallery with published sketches</li>
      <li>Proper backend for saving and loading</li>
    </ul>
    <h3>Bugs</h3>
    <ul>
      <li>Saving projects in the cloud tab gives strange errors</li>
      <li>
        Connections can't be drawn graphically from blocks right to left,
        z-index issues (the connection will be before the block)
      </li>
      <li>
        Connections are recalculated every n frames now, which causes a delay
        and unnecessary computing power. Should be event based on position
        changes.
      </li>
    </ul>
    <h2 id="contact">Contact</h2>
    <p>
      For questions or if you want to join me in developing the project :)
      contact me at
      <a href="mailto:info@janbijster.com">info@janbijster.com</a>.
    </p>
    <h2 id="for-development">For development</h2>
    <p>
      Cobble is open source. Find the source code at
      <a href="https://github.com/janbijster/cobble"
        >github.com/janbijster/cobble</a
      >
    </p>
  </div>
</template>

<style lang="css" scoped>
.about {
  margin: 30px 20px 20px;
  height: calc(100vh - 5.5rem);
  overflow-y: scroll;
}
p {
  margin: 0.5rem 0;
}
h1,
h2 {
  color: #fff;
}
h1,
h2,
h3 {
  margin-top: 1rem;
}
strong {
  color: #fff;
}
ul,
li {
  list-style-type: circle;
}
ul > li {
  margin-left: 2rem;
}
</style>
