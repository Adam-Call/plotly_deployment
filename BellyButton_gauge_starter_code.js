// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples_values = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var newSample_array = samples_values.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var newSample = newSample_array[0];
    
    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = newSample.otu_ids;
    var otu_labels = newSample.otu_labels;
    var sample_values = newSample.sample_values;    

    // 3. Create a variable that holds the washing frequency.
    var washes = result.wfreq;
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`);
    // Use Plotly to plot the bar data and layout.
    // Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);  
    
    
    // Use Plotly to plot the bubble data and layout.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Rainbow',
        size: sample_values,
        
      } 
    }
    ];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'}
    };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);     
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washes,
        title: { text: <h3>Belly Button Washing Frequency</h3>/<h4>Scrubs per Week</h4> },
        type: "indicator",
        mode: "gauge+number+delta",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: 'black'},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ]
        }
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     margin: {t:0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
};
