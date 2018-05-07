using System;
using System.ComponentModel.DataAnnotations;

namespace BIF4.SomeAngularDemo.Models
{
    public class ToDoItemCreationData
    {
        [Required]
        [StringLength(500, MinimumLength = 10)]
        public string Text { get; set; }

        public DateTime CompleteUntil { get; set; }

    }
}