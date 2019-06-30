var data = {lines:[
{"lineNum":"    1","line":"// Bitcoin Hashes Library","class":"lineNoCov","hits":"0","possible_hits":"8",},
{"lineNum":"    2","line":"// Written in 2018 by"},
{"lineNum":"    3","line":"//   Andrew Poelstra <apoelstra@wpsoftware.net>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// To the extent possible under law, the author(s) have dedicated all"},
{"lineNum":"    6","line":"// copyright and related and neighboring rights to this software to"},
{"lineNum":"    7","line":"// the public domain worldwide. This software is distributed without"},
{"lineNum":"    8","line":"// any warranty."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// You should have received a copy of the CC0 Public Domain Dedication"},
{"lineNum":"   11","line":"// along with this software."},
{"lineNum":"   12","line":"// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>."},
{"lineNum":"   13","line":"//"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"//! # Rust Hashes Library"},
{"lineNum":"   16","line":"//!"},
{"lineNum":"   17","line":"//! This is a simple, no-dependency library which implements the hash functions"},
{"lineNum":"   18","line":"//! needed by Bitcoin. These are SHA256, SHA256d, and RIPEMD160. As an ancillary"},
{"lineNum":"   19","line":"//! thing, it exposes hexadecimal serialization and deserialization, since these"},
{"lineNum":"   20","line":"//! are needed to display hashes anway."},
{"lineNum":"   21","line":"//!"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"// Coding conventions"},
{"lineNum":"   24","line":"#![deny(non_upper_case_globals)]"},
{"lineNum":"   25","line":"#![deny(non_camel_case_types)]"},
{"lineNum":"   26","line":"#![deny(non_snake_case)]"},
{"lineNum":"   27","line":"#![deny(unused_mut)]"},
{"lineNum":"   28","line":"#![deny(missing_docs)]"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"#![cfg_attr(all(test, feature = \"unstable\"), feature(test))]"},
{"lineNum":"   31","line":"#[cfg(all(test, feature = \"unstable\"))] extern crate test;"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"#[cfg(feature=\"serde\")] extern crate serde;"},
{"lineNum":"   34","line":"#[cfg(all(test,feature=\"serde\"))] extern crate serde_test;"},
{"lineNum":"   35","line":"extern crate byteorder;"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"#[macro_use] mod util;"},
{"lineNum":"   38","line":"#[macro_use] mod serde_macros;"},
{"lineNum":"   39","line":"pub mod error;"},
{"lineNum":"   40","line":"pub mod hex;"},
{"lineNum":"   41","line":"pub mod hash160;"},
{"lineNum":"   42","line":"pub mod hmac;"},
{"lineNum":"   43","line":"pub mod ripemd160;"},
{"lineNum":"   44","line":"pub mod sha1;"},
{"lineNum":"   45","line":"pub mod sha256;"},
{"lineNum":"   46","line":"pub mod sha512;"},
{"lineNum":"   47","line":"pub mod sha256d;"},
{"lineNum":"   48","line":"pub mod cmp;"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"use std::{borrow, fmt, hash, io, ops};"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"pub use hmac::{Hmac, HmacEngine};"},
{"lineNum":"   53","line":"pub use error::Error;"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"/// A hashing engine which bytes can be serialized into. It is expected"},
{"lineNum":"   56","line":"/// to implement the `io::Write` trait, but to never return errors under"},
{"lineNum":"   57","line":"/// any conditions."},
{"lineNum":"   58","line":"pub trait HashEngine: Clone + io::Write {"},
{"lineNum":"   59","line":"    /// Byte array representing the internal state of the hash engine"},
{"lineNum":"   60","line":"    type MidState;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    /// Outputs the midstate of the hash engine. This function should not be"},
{"lineNum":"   63","line":"    /// used directly unless you really know what you\'re doing."},
{"lineNum":"   64","line":"    fn midstate(&self) -> Self::MidState;"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    /// Length of the hash\'s internal block size, in bytes"},
{"lineNum":"   67","line":"    const BLOCK_SIZE: usize;"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    /// Add data to the hash engine without any error return type to deal with"},
{"lineNum":"   70","line":"    #[inline(always)]"},
{"lineNum":"   71","line":"    fn input(&mut self, data: &[u8]) {"},
{"lineNum":"   72","line":"        self.write_all(data).expect(\"hash returned error\");"},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":"}"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"/// Trait which applies to hashes of all types"},
{"lineNum":"   77","line":"pub trait Hash: Copy + Clone + PartialEq + Eq + Default + PartialOrd + Ord +"},
{"lineNum":"   78","line":"    hash::Hash + fmt::Debug + fmt::Display + fmt::LowerHex +"},
{"lineNum":"   79","line":"    ops::Index<ops::RangeFull, Output = [u8]> +"},
{"lineNum":"   80","line":"    ops::Index<ops::RangeFrom<usize>, Output = [u8]> +"},
{"lineNum":"   81","line":"    ops::Index<ops::RangeTo<usize>, Output = [u8]> +"},
{"lineNum":"   82","line":"    ops::Index<ops::Range<usize>, Output = [u8]> +"},
{"lineNum":"   83","line":"    ops::Index<usize, Output = u8> +"},
{"lineNum":"   84","line":"    hex::ToHex + borrow::Borrow<[u8]>"},
{"lineNum":"   85","line":"{"},
{"lineNum":"   86","line":"    /// A hashing engine which bytes can be serialized into. It is expected"},
{"lineNum":"   87","line":"    /// to implement the `io::Write` trait, and to never return errors under"},
{"lineNum":"   88","line":"    /// any conditions."},
{"lineNum":"   89","line":"    type Engine: HashEngine;"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    /// The byte array that represents the hash internally"},
{"lineNum":"   92","line":"    type Inner;"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    /// Construct a new engine"},
{"lineNum":"   95","line":"    fn engine() -> Self::Engine;"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    /// Produce a hash from the current state of a given engine"},
{"lineNum":"   98","line":"    fn from_engine(e: Self::Engine) -> Self;"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"    /// Length of the hash, in bytes"},
{"lineNum":"  101","line":"    const LEN: usize;"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    /// Copies a byte slice into a hash object"},
{"lineNum":"  104","line":"    fn from_slice(sl: &[u8]) -> Result<Self, Error>;"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    /// Hashes some bytes"},
{"lineNum":"  107","line":"    fn hash(data: &[u8]) -> Self {","class":"linePartCov","hits":"1","order":"3374","possible_hits":"2",},
{"lineNum":"  108","line":"        use std::io::Write;"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"        let mut engine = Self::engine();","class":"lineCov","hits":"1","order":"3375","possible_hits":"1",},
{"lineNum":"  111","line":"        engine.write_all(data).unwrap();","class":"lineCov","hits":"1","order":"3381","possible_hits":"1",},
{"lineNum":"  112","line":"        Self::from_engine(engine)","class":"lineCov","hits":"1","order":"3555","possible_hits":"1",},
{"lineNum":"  113","line":"    }","class":"lineCov","hits":"1","order":"3646","possible_hits":"1",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    /// Flag indicating whether user-visible serializations of this hash"},
{"lineNum":"  116","line":"    /// should be backward. For some reason Satoshi decided this should be"},
{"lineNum":"  117","line":"    /// true for `Sha256dHash`, so here we are."},
{"lineNum":"  118","line":"    const DISPLAY_BACKWARD: bool = false;"},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    /// Unwraps the hash and returns the underlying byte array"},
{"lineNum":"  121","line":"    fn into_inner(self) -> Self::Inner;"},
{"lineNum":"  122","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "lightning_invoice-df7259e68a5ae463", "date" : "2019-06-30 10:20:19", "instrumented" : 6, "covered" : 5,};
var merged_data = [];
