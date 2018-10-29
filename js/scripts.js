// Business Logic for EventsList ---------
function EventsList() {
  this.events = [],
  this.currentId = 0
}
EventsList.prototype.addEvent = function(list) {
  list.id = this.assignId();
  this.events.push(list);
}

EventsList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

EventsList.prototype.findEvent = function(id) {
  for (var i=0; i< this.events.length; i++) {
    if (this.events[i]) {
      if (this.events[i].id == id) {
        return this.events[i];
      }
    }
  };
  return false;
}

EventsList.prototype.deleteEvent = function(id) {
  for (var i=0; i< this.events.length; i++) {
    if (this.events[i]) {
      if (this.events[i].id == id) {
        delete this.events[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for events ---------
function Event(eventName, notes, priority) {
  this.eventName = eventName,
  this.notes = notes,
  this.priority = priority
}

Event.prototype.listName = function() {
  return this.eventName;
}

// User Interface Logic ---------
var eventsList = new EventsList();

function displayEventDetails(eventsListToDisplay) {
  var eventsList = $("ul#events");
  var htmlForEventInfo = "";
  eventsListToDisplay.events.forEach(function(list) {
    htmlForEventInfo += "<li id=" + list.id + ">" + list.eventName + " " + list.notes + "</li>";
  });
  eventsList.html(htmlForEventInfo);
};

function showEvent(listId) {
  var list = eventsList.findEvent(listId);
  $("#show-events").show();
  $(".event-name").html(list.eventName);
  $(".notes").html(list.notes);
  $(".priority").html(list.priority);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + list.id + ">Delete</button>");
}

function attachEventListeners() {
  $("ul#events").on("click", "li", function() {
    showEvent(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    eventsList.deleteEvent(this.id);
    $("#show-events").hide();
    displayEventDetails(EventsList);
  });
};

$(document).ready(function() {
  attachEventListeners();
  $("form#new-event").submit(function(event) {
    event.preventDefault();
    var inputtedEventName = $("input#new-event-name").val();
    var inputtedNotes = $("input#new-notes").val();
    var inputtedPriority = $("input#new-priority").val();
    $("input#new-event-name").val("");
    $("input#new-notes").val("");
    $("input#new-priority").val("");
    var newEvent = new Event(inputtedEventName, inputtedNotes, inputtedPriority);
    eventsList.addEvent(newEvent);
    displayEventDetails(eventsList);
  })
})
