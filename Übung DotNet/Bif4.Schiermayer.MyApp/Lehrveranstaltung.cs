using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bif4.Schiermayer.MyApp
{
    public class Lehrveranstaltung
    {
        public int ID { get; set; }

        public string Fullname { get; set; }
        public string Abbreviation { get; set; }
        public string Lector { get; set; }
        public float ECTS { get; set; }
        public string Exam { get; set; }
        public string Moodle { get; set; }

        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserSubject { get; set; }
    }
}
