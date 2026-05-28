import "./Contacto.css";

import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt
} from "react-icons/fa";

function Contacto() {
  return (
    <section id="contacto">

      <h2>Contacto</h2>

      <ul id="listaContacto">

        <li>
          <a
            href="https://wa.me/5493812150108"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </li>

        <li>
          <a
            href="https://www.instagram.com/elemental.cal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
            Instagram
          </a>
        </li>

        <li>
          <a
            href="https://www.google.com/maps?q=Avenida+Saenz+Peña+715,+San+Miguel+de+Tucumán,+Tucumán,+Argentina"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkerAlt />
            Avenida Saenz Peña 715
          </a>
        </li>

      </ul>

    </section>
  );
}

export default Contacto;