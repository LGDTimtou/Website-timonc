import TipBox from "../custom_components/TipBox";
import ExtraFunctionalityTipBox from "../custom_components/ExtraFunctionalityTipBox";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const InstructionExpressionContent = () => {
  return (
    <div>
      <p className="content-intro">
        Documentation on how expressions can be used in instructions, delay
        values...
      </p>
      <div className="parameters-section">
        <p className="subsection-title offset">Instruction Expressions</p>
        <p className="minecraft offset">
          Expressions in instructions are defined using the syntax{" "}
          <code>$[expression]</code>. These expressions are evaluated
          dynamically using the{" "}
          <a
            href="https://ezylang.github.io/EvalEx/"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Evalex library
          </a>
          .
        </p>
        <p className="minecraft offset">
          <span className="highlight">Example</span>, teleporting the player 4
          blocks up in the air:
        </p>
        <pre className="code-block offset">
          <SyntaxHighlighter
            language="java"
            style={stackoverflowDark}
            customStyle={{ background: "", paddingLeft: "20px" }}
          >
            tp %player% %player_x% $[%player_y% + sqrt(16)] %player_z%
          </SyntaxHighlighter>
        </pre>
        <TipBox>
          <ul>
            <li>
              <a
                href="https://ezylang.github.io/EvalEx/references/functions.html"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Functions
              </a>
            </li>
            <li>
              <a
                href="https://ezylang.github.io/EvalEx/references/operators.html"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Operators
              </a>
            </li>
            <li>
              <a
                href="https://ezylang.github.io/EvalEx/references/constants.html"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Constants
              </a>
            </li>
          </ul>
        </TipBox>
      </div>
      <ExtraFunctionalityTipBox
        firstLine={"a new function, operator or constant"}
      />
    </div>
  );
};

export default InstructionExpressionContent;
