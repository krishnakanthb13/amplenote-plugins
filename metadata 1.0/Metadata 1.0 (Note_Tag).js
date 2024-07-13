(() => {
  var Meta_1 = {
    insertText: {
      "Name_Tag": async function(app) {
        try {
          const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
            inputs: [
              { label: "Select Tags to filter (Max 3)", type: "tags", limit: 3, placeholder: "Enter tag/'s' (Max 3)" },
              { label: "Type Partial or Full name of the Note", type: "string", placeholder: "Enter Partial or Full name" },
              { 
                label: "Sort by Note Name", 
                type: "select", 
                options: [
                  { label: "None (Default)", value: "" },
                  { label: "Ascending (ASC)", value: "asc" },
                  { label: "Descending (DESC)", value: "desc" }
                ]
              },
              { 
                label: "Sort by Tags", 
                type: "select", 
                options: [
                  { label: "None (Default)", value: "" },
                  { label: "Ascending (ASC)", value: "asc" },
                  { label: "Descending (DESC)", value: "desc" }
                ]
              },
              { label: "Sort tags alphabetically (within a Note!)", type: "checkbox" },
              {
                label: "Insert / Export options (Mandatory)",
                type: "select",
                options: [
                  { label: "Insert into current note", value: "current_note" },
                  { label: "Insert into new note", value: "new_note" },
                  { label: "Download as markdown", value: "download_md" },
                  { label: "Download as CSV", value: "download_csv" },
                  { label: "Download as TXT", value: "download_txt" }
                ]
              },
              {
                label: "Select format (Mandatory)",
                type: "select",
                options: [
                  { label: "Both (Table format)", value: "both_table" },
                  { label: "Names only", value: "names_only" },
                  { label: "Tags only", value: "tags_only" }, // I have updated the code to give distinct tags!
                  { label: "Published only (Table format)", value: "published_only" }
                ]
              }
            ]
          });

          if (!result) {
            app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
            return;
          }

          const [tagNames, nameFilter, sortOption, sortTagOption, sortTags, insertOption, insertFormat] = result;
          
          // If tagNames is empty, set it to an empty array
          const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];

          let notes = [];

          // If there are tags, filter notes by each tag and accumulate results
          if (tagsArray.length > 0) {
            for (let tag of tagsArray) {
              let taggedNotes = await app.filterNotes({ tag });
              notes = notes.concat(taggedNotes);
            }
          } else {
            // If no tags are provided, fetch all notes
            notes = await app.filterNotes({});
          }

          // Remove duplicate notes
          notes = notes.filter((note, index, self) =>
            index === self.findIndex((n) => (
              n.uuid === note.uuid
            ))
          );

          // Further filter notes by name if a name filter is provided
          if (nameFilter) {
            notes = notes.filter(note => note.name.includes(nameFilter));
          }

          // Sort notes by name based on the user's selection
          if (sortOption === "asc") {
            notes.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sortOption === "desc") {
            notes.sort((a, b) => b.name.localeCompare(a.name));
          }

          // Fetch tags for each note and generate results
          const self = this;
          let results = new Set();
          let publicResults = [];
          
          for (let note of notes) {
            let tags = note.tags;

            // Sort tags within the note if the checkbox is checked
            if (sortTags) {
              tags.sort((a, b) => a.localeCompare(b));
            }

            let noteLink = self._createMDLinkFromNoteHandle(note);
            let tagString = tags.join(", ");

            if (insertFormat === "both_table") {
              results.add(`| ${noteLink} | ${tagString} |`);
            } else if (insertFormat === "names_only") {
              results.add(noteLink);
            } else if (insertFormat === "tags_only") {
              tags.forEach(tag => results.add(tag));
            } else if (insertFormat === "published_only") {
              const publicURL = await app.getNotePublicURL({ uuid: note.uuid });
              if (publicURL) {
                publicResults.push(`| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | [${publicURL}](${publicURL}) |`);
              }
            }
          }

          results = Array.from(results);

          // Sort the final list of results based on the selected tag sorting option
          if (sortTagOption === "asc") {
            results.sort((a, b) => a.localeCompare(b));
          } else if (sortTagOption === "desc") {
            results.sort((a, b) => b.localeCompare(a));
          }

          // Generate the final text, CSV, and TXT content
          let resultText;
          let resultCSV;
          if (insertFormat === "both_table") {
            resultText = "| Note Name | Tags |\n|---|---|\n" + results.join("\n");
            resultCSV = "Note Name,Tags\n" + results.map(row => {
              let parts = row.split('|').map(s => s.trim());
              let name = parts[1];
              let tags = parts[2];
              return `"${name.replace(/"/g, '""')}", "${tags.replace(/"/g, '""')}"`;
            }).join("\n");
          } else if (insertFormat === "published_only") {
            resultText = "| Notes | Public URL |\n|---|---|\n" + publicResults.join("\n");
            resultCSV = "Notes,Public URL\n" + publicResults.map(row => {
              let parts = row.split('|').map(s => s.trim());
              let name = parts[1];
              let url = parts[2];
              return `"${name.replace(/"/g, '""')}", "${url.replace(/"/g, '""')}"`;
            }).join("\n");
          } else {
            resultText = results.join("\n");
            resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
          }

          // Generate the filename based on the current date and time
          const now = new Date();
          const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
          const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
          const filename = `Metadata1_${YYMMDD}_${HHMMSS}`;

          // Generate the summary of input selections
          const inputSummary = `
### Input Selections:
- Tags to filter: ${tagNames || "None"}
- Note name filter: ${nameFilter || "None"}
- Sort by name: ${sortOption || "None"}
- Sort tags by name: ${sortTagOption || "None"}
- Sort tags alphabetically within a Note: ${sortTags ? "Yes" : "No"}
- Insert option: ${insertOption}
- Format to insert: ${insertFormat}
`;

          // Append the summary to the result text
          resultText += `\n\n${inputSummary}`;
          resultCSV += `\n\n${inputSummary.replace(/[\n]/g, "")}`;
          
          if (insertOption === "current_note") {
            await app.context.replaceSelection(resultText);
          } else if (insertOption === "new_note") {
            let noteUUID = await app.createNote("Metadata 1.0 Report",["metadata-reports"]);
            await app.insertContent(
                  { uuid: noteUUID },
              resultText
            );
          } else if (insertOption === "download_md") {
            let blob = new Blob([resultText], { type: "text/markdown;charset=utf-8" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else if (insertOption === "download_csv") {
            let blob = new Blob([resultCSV], { type: "text/csv;charset=utf-8" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else if (insertOption === "download_txt") {
            let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

          app.alert("Results Generated and Pasted/Downloaded Successfully!");

        } catch (error) {
          app.alert(String(error));
        }
      }
    },
    _createMDLinkFromNoteHandle(noteHandle) {
      return `[${noteHandle.name}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
    }
  };
  var plugin_default = Meta_1;
  return Meta_1;
})()