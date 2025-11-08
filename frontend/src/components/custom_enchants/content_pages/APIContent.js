import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ExtraFunctionalityTipBox from "../custom_components/ExtraFunctionalityTipBox";

const APIContent = () => {
  return (
    <div>
      <p className="content-intro">
        How to Import and Use the CustomEnchants API
      </p>

      <div className="parameters-section">
        <h1 className="subsection-title offset">Importing the API</h1>
        <h1 className="subsubsection-title offset">Maven</h1>
        <p className="minecraft offset">
          To import the CustomEnchants API using Maven, add the following to
          your <code>pom.xml</code> file:
        </p>
        <SyntaxHighlighter
          language="xml"
          style={stackoverflowDark}
          customStyle={{ background: "" }}
        >
          {`<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
          
<dependencies>
  <dependency>
    <groupId>be.timonc.custom-enchants</groupId>
    <artifactId>core</artifactId>
    <version>latest</version>
  </dependency>
</dependencies>`}
        </SyntaxHighlighter>
        <h1 className="subsubsection-title offset">Gradle</h1>
        <p className="minecraft offset">
          To import the CustomEnchants API using Gradle, add the following to
          your <code>build.gradle</code> file:
        </p>
        <SyntaxHighlighter
          language="gradle"
          style={stackoverflowDark}
          customStyle={{ background: "" }}
        >
          {`repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'be.timonc.custom_enchants:core:latest' 
}`}
        </SyntaxHighlighter>
      </div>
      <div className="parameters-section">
        <h1 className="subsection-title offset">Example Usage</h1>
        <h1 className="subsubsection-title offset">
          Listening for CustomEnchantTriggerEvent
        </h1>
        <SyntaxHighlighter
          language="java"
          style={stackoverflowDark}
          customStyle={{ background: "" }}
        >
          {`import be.timonc.customenchantments.api.CustomEnchantTriggerEvent;
import be.timonc.customenchantments.enchantments.created.fields.triggers.TriggerType;
import ...;

public class MyPlugin extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {
        // Register the event listener
        getServer().getPluginManager().registerEvents(this, this);
    }

    @EventHandler
    public void onCustomEnchantTriggered(CustomEnchantTriggerEvent event) {
        // Fetching all event values
        Event bukkitEvent = event.getEvent();
        Player player = event.getPlayer();
        Enchantment enchantment = event.getEnchantment();

        // Checking if the trigger type is BLOCK_DAMAGED
        // Here you could also check what enchantment triggered this call
        if (event.getTriggerType() == TriggerType.BLOCK_DAMAGED) {
            // Fetching the parameters provided by this trigger 
            // to get the respective block
            Integer x = event.getIntParameter("block_x");
            Integer y = event.getIntParameter("block_y");
            Integer z = event.getIntParameter("block_z");

            // Setting it to AIR
            player.getWorld().getBlockAt(x, y, z).setType(Material.AIR);
        }
    }
}
`}
        </SyntaxHighlighter>
      </div>
      <ExtraFunctionalityTipBox firstLine={"new API functionality"} />
    </div>
  );
};

export default APIContent;
